'use client'

import { LineChart } from '@tinybirdco/charts'

const token = process.env.NEXT_PUBLIC_TINYBIRD_DASHBOARD_READ_TOKEN;

export function SalesOverTime(params: {
    airline: string
}) {
    return (
        <LineChart
            endpoint="https://api.eu-central-1.aws.tinybird.co/v0/pipes/sales_over_time_by_airline.json"
            token={token}
            index="day"
            categories={['total']}
            colorPalette={['#27F795', '#008060', '#0EB1B9', '#9263AF', '#5A6FC0', '#86BFDB', '#FFC145', '#FF6B6C', '#DC82C8', '#FFC0F1']}
            title="Sales over time"
            height="500px"
            params={params}
        />
    )
}