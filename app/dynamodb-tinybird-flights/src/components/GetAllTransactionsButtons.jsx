"use client";
import { Button } from "./ui/button";
import * as fakeData from '@/lib/fakeData';


export default function GetAllTransactionsButtons({ userId, setTransactions }) {

    const passport = fakeData.users[userId - 1].passport_number;

    function getUserData() {
        const response = fetch('/api/flights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ passport_number: passport }),
        }).then(async (response) => setTransactions(await response.json()));
    };

    return (
        <>
            <Button onClick={() => { getUserData() }}>Get user data</Button>
        </>
    );
}
