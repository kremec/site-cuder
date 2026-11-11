// Google Performance API snapshots. Dashboard queries use the latest snapshot
// for each date/month, so reimports and Google's corrections aren't double-counted.
export const metrics = {
  BUSINESS_IMPRESSIONS_DESKTOP_SEARCH: 'desktop_search_views',
  BUSINESS_IMPRESSIONS_MOBILE_SEARCH: 'mobile_search_views',
  BUSINESS_IMPRESSIONS_DESKTOP_MAPS: 'desktop_maps_views',
  BUSINESS_IMPRESSIONS_MOBILE_MAPS: 'mobile_maps_views',
  CALL_CLICKS: 'call_clicks',
  WEBSITE_CLICKS: 'website_clicks',
  BUSINESS_DIRECTION_REQUESTS: 'direction_requests',
  MESSAGING_CLICKS: 'message_clicks',
};

export function dailyRows(data) {
  const rows = new Map();
  for (const group of data.multiDailyMetricTimeSeries ?? []) {
    for (const series of group.dailyMetricTimeSeries ?? []) {
      const metric = metrics[series.dailyMetric];
      if (!metric) throw new Error(`Unexpected Google metric: ${series.dailyMetric}`);
      for (const { date, value } of series.timeSeries?.datedValues ?? []) {
        const day = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
        if (!rows.has(day)) rows.set(day, { metric_date: day });
        // Protobuf omits a zero value; an absent date stays absent.
        rows.get(day)[metric] = Number(value ?? 0);
      }
    }
  }
  return [...rows.values()].sort((a, b) => a.metric_date.localeCompare(b.metric_date));
}

export async function sync({ env = process.env, fetcher = fetch, now = new Date() } = {}) {
  for (const name of ['GOOGLE_BUSINESS_PROFILE_CLIENT', 'GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN', 'GBP_LOCATION']) {
    if (!env[name]) throw new Error(`Missing ${name}`);
  }
  if (!/^locations\/\d+$/.test(env.GBP_LOCATION)) throw new Error('GBP_LOCATION must be locations/<id>');
  const { installed: client } = JSON.parse(env.GOOGLE_BUSINESS_PROFILE_CLIENT);
  const today = new Date(`${new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Ljubljana' }).format(now)}T00:00:00Z`);
  const end = new Date(today.getTime() - 86400000);
  const start = env.GBP_START_DATE
    ? new Date(`${env.GBP_START_DATE}T00:00:00Z`)
    : new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 2, 1));
  if (!Number.isFinite(start.getTime()) || start > end) throw new Error('Invalid GBP_START_DATE');

  async function request(url, options) {
    const response = await fetcher(url, { ...options, signal: AbortSignal.timeout(30000) });
    const body = await response.json();
    if (!response.ok) throw new Error(`${new URL(url).hostname}: HTTP ${response.status} (${body.error?.status ?? 'request failed'})`);
    return body;
  }

  const token = await request('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: client.client_id,
      client_secret: client.client_secret,
      refresh_token: env.GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });
  const headers = { Authorization: `Bearer ${token.access_token}` };
  const base = `https://businessprofileperformance.googleapis.com/v1/${env.GBP_LOCATION}`;
  const dailyUrl = new URL(`${base}:fetchMultiDailyMetricsTimeSeries`);
  for (const metric of Object.keys(metrics)) dailyUrl.searchParams.append('dailyMetrics', metric);
  for (const [side, date] of [['startDate', start], ['endDate', end]]) {
    for (const [part, value] of [['year', date.getUTCFullYear()], ['month', date.getUTCMonth() + 1], ['day', date.getUTCDate()]]) {
      dailyUrl.searchParams.set(`dailyRange.${side}.${part}`, String(value));
    }
  }

  const events = [];
  function snapshot(event, date, properties) {
    events.push({
      event,
      distinct_id: `google-business-profile:${env.GBP_LOCATION}`,
      timestamp: `${date}T12:00:00Z`,
      properties: {
        ...properties,
        location_id: env.GBP_LOCATION,
        synced_at: now.toISOString(),
        $process_person_profile: false,
        $geoip_disable: true,
      },
    });
  }
  const days = dailyRows(await request(dailyUrl, { headers }));
  if (!days.length) throw new Error('Google returned no daily data; nothing imported');
  for (const row of days) snapshot('google_business_profile_daily', row.metric_date, row);

  // Request each completed month separately: Google's response aggregates the
  // entire requested range, and thresholds must remain thresholds, not counts.
  for (let month = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 1));
    month < new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
    month.setUTCMonth(month.getUTCMonth() + 1)) {
    const url = new URL(`${base}/searchkeywords/impressions/monthly`);
    for (const side of ['startMonth', 'endMonth']) {
      url.searchParams.set(`monthlyRange.${side}.year`, String(month.getUTCFullYear()));
      url.searchParams.set(`monthlyRange.${side}.month`, String(month.getUTCMonth() + 1));
    }
    url.searchParams.set('pageSize', '100');
    const keywords = [];
    let page;
    do {
      page = await request(url, { headers });
      for (const keyword of page.searchKeywordsCounts ?? []) {
        const { value, threshold } = keyword.insightsValue;
        keywords.push({
          search_term: keyword.searchKeyword,
          ...(value !== undefined ? { impressions: Number(value) } : { threshold: Number(threshold) }),
        });
      }
      url.searchParams.set('pageToken', page.nextPageToken ?? '');
    } while (page.nextPageToken);
    const date = month.toISOString().slice(0, 10);
    snapshot('google_business_profile_search_monthly', date, { metric_month: date, keywords });
  }

  const result = await request('https://eu.i.posthog.com/batch/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: 'phc_r4nc39bwbAdXUctqMcDqhseP2ZWaLAUWayrZFoQ2ENJW',
      historical_migration: true,
      batch: events,
    }),
  });
  if (result.status !== 'Ok') throw new Error('PostHog did not acknowledge the batch');
  console.log(`Imported ${days.length} daily snapshots and ${events.length - days.length} monthly search snapshots.`);
  return events;
}

if (import.meta.main) {
  sync().catch(error => { console.error(error.message); process.exitCode = 1; });
}
