import assert from 'node:assert/strict';
import test from 'node:test';
import { dailyRows, sync } from './sync-business-profile.mjs';

const daily = { multiDailyMetricTimeSeries: [{ dailyMetricTimeSeries: [
  { dailyMetric: 'CALL_CLICKS', timeSeries: { datedValues: [
    { date: { year: 2026, month: 10, day: 1 }, value: '2' },
    { date: { year: 2026, month: 10, day: 2 } },
  ] } },
  { dailyMetric: 'WEBSITE_CLICKS', timeSeries: { datedValues: [
    { date: { year: 2026, month: 10, day: 1 }, value: '1' },
  ] } },
] }] };

test('merges Google series by date, distinguishes zero from missing data', () => {
  assert.deepEqual(dailyRows(daily), [
    { metric_date: '2026-10-01', call_clicks: 2, website_clicks: 1 },
    { metric_date: '2026-10-02', call_clicks: 0 },
  ]);
});

const env = {
  GOOGLE_BUSINESS_PROFILE_CLIENT: JSON.stringify({ installed: { client_id: 'test', client_secret: 'test' } }),
  GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN: 'test',
  GBP_LOCATION: 'locations/123',
  GBP_START_DATE: '2026-10-01',
};

test('imports paginated monthly keywords with thresholds and explicit snapshot dates', async () => {
  let captured;
  const events = await sync({ env, now: new Date('2026-11-01T00:30:00Z'), fetcher: async (input, options) => {
    const url = new URL(input);
    let body;
    if (url.hostname === 'oauth2.googleapis.com') body = { access_token: 'test' };
    else if (url.pathname.endsWith(':fetchMultiDailyMetricsTimeSeries')) {
      assert.equal(url.searchParams.get('dailyRange.endDate.day'), '31');
      assert.equal(url.searchParams.get('dailyRange.endDate.month'), '10');
      assert.equal(url.searchParams.getAll('dailyMetrics').length, 8);
      body = daily;
    } else if (url.pathname.endsWith('/monthly')) {
      assert.equal(url.searchParams.get('monthlyRange.startMonth.month'), '10');
      assert.equal(url.searchParams.get('monthlyRange.endMonth.month'), '10');
      body = url.searchParams.get('pageToken')
        ? { searchKeywordsCounts: [{ searchKeyword: 'servis', insightsValue: { threshold: '15' } }] }
        : { searchKeywordsCounts: [{ searchKeyword: 'cuder', insightsValue: { value: '0' } }], nextPageToken: 'next' };
    } else {
      assert.equal(url.href, 'https://eu.i.posthog.com/batch/');
      captured = JSON.parse(options.body); body = { status: 'Ok' };
    }
    return new Response(JSON.stringify(body), { status: 200 });
  } });
  assert.equal(captured.batch.length, 3);
  assert.equal(captured.historical_migration, true);
  assert.equal(events[0].timestamp, '2026-10-01T12:00:00Z');
  assert.equal(events[0].properties.synced_at, '2026-11-01T00:30:00.000Z');
  assert.equal(events[0].properties.$process_person_profile, false);
  assert.deepEqual(events[2].properties.keywords, [
    { search_term: 'cuder', impressions: 0 }, { search_term: 'servis', threshold: 15 },
  ]);
});

test('a failed Google request never sends partial data to PostHog', async () => {
  let captures = 0;
  await assert.rejects(sync({ env, now: new Date('2026-11-01T00:30:00Z'), fetcher: async input => {
    const url = new URL(input);
    if (url.hostname === 'eu.i.posthog.com') captures++;
    return new Response(JSON.stringify(url.hostname === 'oauth2.googleapis.com'
      ? { access_token: 'test' } : { error: { status: 'PERMISSION_DENIED' } }),
    { status: url.hostname === 'oauth2.googleapis.com' ? 200 : 403 });
  } }), /HTTP 403/);
  assert.equal(captures, 0);
});
