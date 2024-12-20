'use client'

import { LineChart } from '@tinybirdco/charts'

const token = process.env.NEXT_PUBLIC_TINYBIRD_DASHBOARD_READ_TOKEN;

export function FlightCostOverTime(params: {
    company: string
}) {
    return (
        <LineChart
            endpoint="https://api.eu-central-1.aws.tinybird.co/v0/pipes/api_flight_cost_over_time.json"
            token={token}
            index="month"
            title="Flight cost over time"
            categories={['total cost']}
            colorPalette={['#27F795', '#008060', '#0EB1B9', '#9263AF', '#5A6FC0', '#86BFDB', '#FFC145', '#FF6B6C', '#DC82C8', '#FFC0F1']}
            showLegend={true}
            height="500px"
            params={params}
        />
    )
}