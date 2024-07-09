"use client";

import * as fakeData from '@/lib/fakeData';
import { SalesOverTime } from './tinybird/SalesOverTime';
import { Metric } from './Metric';
import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { MealChoices } from './tinybird/MealChoices';

const token = process.env.NEXT_PUBLIC_TINYBIRD_DASHBOARD_READ_TOKEN;

export default function AirlineDashboard({ userId, tableKey }: { userId: number, tableKey: number }) {

    const [totalFlights, setTotalFlights] = useState(0);
    const [topDestination, setTopDestination] = useState("none");
    const [bagUpsells, setBagUpsells] = useState(0);

    const airline = fakeData.users[userId - 1].name;

    async function getTotalFlights() {
        let url = new URL(`https://api.eu-central-1.aws.tinybird.co/v0/pipes/total_flight_30day_by_airline.json`)

        url.searchParams.append('airline', airline)

        const result = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(r => r.json())
            .then(r => r)
            .catch(e => e.toString())

        if (!result.data) {
            console.error(`there is a problem running the query: ${result}`);
        } else {
            setTotalFlights(result.data[0].flights);
        }
    }

    async function getTopDestination() {
        let url = new URL(`https://api.eu-central-1.aws.tinybird.co/v0/pipes/top_destination_by_airline.json`)

        url.searchParams.append('airline', airline)

        const result = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(r => r.json())
            .then(r => r)
            .catch(e => e.toString())

        if (!result.data) {
            console.error(`there is a problem running the query: ${result}`);
        } else {
            setTopDestination(result.data[0].destination);
        }
    }

    async function getBagUpsells() {
        let url = new URL(`https://api.eu-central-1.aws.tinybird.co/v0/pipes/average_bags_by_airline.json`)

        url.searchParams.append('airline', airline)

        const result = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(r => r.json())
            .then(r => r)
            .catch(e => e.toString())

        if (!result.data) {
            console.error(`there is a problem running the query: ${result}`);
        } else {
            setBagUpsells(result.data[0].avg_bags);
        }
    }

    useEffect(() => {
        getTotalFlights();
        getTopDestination();
        getBagUpsells();
    });

    return (
        <>
            <h2 className="text-xl mb-4">{airline} flight dashboard</h2>
            <div className='grid grid-cols-3 gap-4 mb-4 place-items-center'>
                <Metric title='Total flights' metric={totalFlights.toString()} description='' />
                <Metric title='Top destination' metric={topDestination} description='' />
                <Metric title='Average bag upsells' metric={bagUpsells.toString()} description='' />
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <Card className='p-4'><SalesOverTime airline={airline} /></Card>
                <Card className='p-4'><MealChoices airline={airline} /></Card>
            </div>
        </>
    );
}