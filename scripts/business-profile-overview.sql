WITH toStartOfMonth(toDate({filters.dateRange.from})) AS month_start,
daily AS (
    SELECT toDate(properties.metric_date) AS day,
        argMax(tuple(
            toFloat(properties.desktop_search_views),
            toFloat(properties.mobile_search_views),
            toFloat(properties.desktop_maps_views),
            toFloat(properties.mobile_maps_views),
            toFloat(properties.call_clicks),
            toFloat(properties.website_clicks),
            toFloat(properties.direction_requests),
            toFloat(properties.message_clicks)
        ), properties.synced_at) AS snapshot
    FROM events
    WHERE event = 'google_business_profile_daily'
      AND timestamp >= addMonths(month_start, -1)
      AND timestamp < addMonths(month_start, 1)
    GROUP BY properties.location_id, properties.metric_date
),
metrics AS (
    SELECT day, arrayJoin([
        (1, 'Profile views (Search + Maps)', snapshot.1 + snapshot.2 + snapshot.3 + snapshot.4),
        (2, 'Call button clicks', snapshot.5),
        (3, 'Website button clicks', snapshot.6),
        (4, 'Direction requests', snapshot.7),
        (5, 'Message button clicks', snapshot.8)
    ]) AS item
    FROM daily
),
summary AS (
    SELECT item.1 AS rank, item.2 AS metric,
        if(countIf(day < month_start AND item.3 IS NOT NULL) = 0,
            NULL, sumIf(item.3, day < month_start)) AS previous_value,
        if(countIf(day >= month_start AND item.3 IS NOT NULL) = 0,
            NULL, sumIf(item.3, day >= month_start)) AS selected_value
    FROM metrics GROUP BY rank, metric
)
SELECT metric AS Metric,
    previous_value AS `Previous month`, selected_value AS `Selected month`,
    if(previous_value IS NULL OR selected_value IS NULL, '—', concat(
        if(selected_value > previous_value, '+', ''),
        toString(toInt(selected_value) - toInt(previous_value)),
        if(rank = 1 AND previous_value > 0,
            concat(' (', toString(round((selected_value - previous_value) * 100.0 / nullIf(previous_value, 0), 1)), '%)'), '')
    )) AS Change
FROM summary ORDER BY rank
