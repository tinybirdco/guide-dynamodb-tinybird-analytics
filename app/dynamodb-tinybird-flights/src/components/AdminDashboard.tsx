"use client";

import * as fakeData from '@/lib/fakeData';
import { FlightCostOverTime } from './tinybird/FlightCostOverTime';
import { Metric } from './Metric';
import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { ChartTopTravellers } from './tinybird/TopTravellers';

const token = process.env.NEXT_PUBLIC_TINYBIRD_DASHBOARD_READ_TOKEN;

export default function AdminDashboard({ user, tableKey }: { user: fakeData.User, tableKey: number }) {

    const [totalFlights, setTotalFlights] = useState(0);
    const [flightCost, setFlightCost] = useState(0);
    const [uniqueTravellers, setUniqueTravellers] = useState(0);
    const [topTravellers, setTopTravellers] = useState([]);
    const company = user.company;

    async function getTotalFlights() {
        let url = new URL(`https://api.eu-central-1.aws.tinybird.co/v0/pipes/api_flights_taken.json`)

        url.searchParams.append('company', company)

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
            setTotalFlights(result.data[0].total);
        }
    }

    async function getFlightCost() {
        let url = new URL(`https://api.eu-central-1.aws.tinybird.co/v0/pipes/api_flight_cost.json`)

        url.searchParams.append('company', company)

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
            setFlightCost(result.data[0].total);
        }
    }

    async function getUniqueTravellers() {
        let url = new URL(`https://api.eu-central-1.aws.tinybird.co/v0/pipes/api_unique_travellers.json`)

        url.searchParams.append('company', company)

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
            setUniqueTravellers(result.data[0].total);
        }
    }

    async function getTopTravellers() {
        let url = new URL(`https://api.eu-central-1.aws.tinybird.co/v0/pipes/api_top_travellers.json`)

        url.searchParams.append('company', company)

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
            setTopTravellers(result.data);
        }
    }


    useEffect(() => {
        getTotalFlights();
        getFlightCost();
        getUniqueTravellers();
        getTopTravellers();
    });

    return (
        <>
            <h2 className="text-xl mb-4">Company dashboard</h2>
            <div className='grid grid-cols-3 gap-4 mb-4 place-items-center'>
                <Metric title='Total flights' metric={totalFlights.toString()} description='' />
                <Metric title='Total flight cost' metric={flightCost.toString()} description='' />
                <Metric title='Unique travellers' metric={uniqueTravellers.toString()} description='' />
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <Card className='p-4'><FlightCostOverTime company={company} /></Card>
                <Card className='p-4'><ChartTopTravellers company={company} /></Card>
            </div>
        </>
    );
}