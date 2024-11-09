'use client'

import { BarList } from '@tinybirdco/charts'

const token = process.env.NEXT_PUBLIC_TINYBIRD_DASHBOARD_READ_TOKEN;

export function ChartTopTravellers(params: {
    company: string
}) {
    return (
        <BarList
            endpoint="https://api.eu-central-1.aws.tinybird.co/v0/pipes/api_top_travellers.json"
            token={token}
            index="traveller"
            categories={['total']}
            colorPalette={['#27F795', '#008060', '#0EB1B9', '#9263AF', '#5A6FC0', '#86BFDB', '#FFC145', '#FF6B6C', '#DC82C8', '#FFC0F1']}
            height="500px"
            params={params}
        />
    )
}