"use client";
import { SendHorizontal, Loader2, CheckCheck } from "lucide-react";
import { Button } from "./ui/button";
import { fakeData } from '@/lib/fakeData';
import { useState } from "react";

export default function SendRandomItems({ amount }: { amount: number }) {

    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    function sendFakeData() {
        setLoading(true);
        setSuccess(false);

        var items = [];
        for (let i = 0; i < amount; i++) {
            items.push(fakeData());
        }

        const response = fetch('/api/flights/bulk', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items }),
        }).then((response) => {
            setLoading(false);
            setSuccess(true);
        });
    };

    return (
        <>
            <Button disabled={loading} onClick={() => { sendFakeData() }}>
                {loading && <Loader2 className="mr-2 h-4 w-4" />}
                {success && <CheckCheck className="mr-2 h-4 w-4" />}
                {!loading && !success && <SendHorizontal className="mr-2 h-4 w-4" />}
                {amount} rows from random users
            </Button>
        </>
    );
}
