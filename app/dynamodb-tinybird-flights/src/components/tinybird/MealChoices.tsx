'use client'

import { DonutChart } from '@tinybirdco/charts'

const token = process.env.NEXT_PUBLIC_TINYBIRD_DASHBOARD_READ_TOKEN;

export function MealChoices(params: {
    airline: string
}) {
    return (
        <DonutChart
            endpoint="https://api.eu-central-1.aws.tinybird.co/v0/pipes/meal_choices_by_airline.json"
            token={token}
            index="meal_choice"
            categories={['total']}
            colorPalette={['#27F795', '#008060', '#0EB1B9', '#9263AF', '#5A6FC0', '#86BFDB', '#FFC145', '#FF6B6C', '#DC82C8', '#FFC0F1']}
            title="meal_choices_by_airline"
            height="500px"
            params={params}
            showLegend={true}
        />
    )
}