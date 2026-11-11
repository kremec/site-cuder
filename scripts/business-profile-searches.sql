WITH toStartOfMonth(toDate({filters.dateRange.from})) AS month_start,
latest AS (
    SELECT argMax(properties.keywords, properties.synced_at) AS keywords
    FROM events
    WHERE event = 'google_business_profile_search_monthly'
      AND timestamp >= month_start AND timestamp < addMonths(month_start, 1)
    GROUP BY properties.location_id, properties.metric_month
),
terms AS (
    SELECT arrayJoin(JSONExtractArrayRaw(ifNull(keywords, '[]'))) AS keyword FROM latest
)
SELECT JSONExtractString(keyword, 'search_term') AS `Search term`,
    if(JSONHas(keyword, 'impressions'),
        toString(JSONExtractInt(keyword, 'impressions')),
        concat('<', toString(JSONExtractInt(keyword, 'threshold')))
    ) AS `Profile impressions`
FROM terms
ORDER BY if(JSONHas(keyword, 'impressions'),
    JSONExtractInt(keyword, 'impressions'), JSONExtractInt(keyword, 'threshold')) DESC,
    `Search term`
LIMIT 10
