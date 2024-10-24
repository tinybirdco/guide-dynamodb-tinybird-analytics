"use client";
import { SendHorizontal, Loader2, CheckCheck } from "lucide-react";
import { Button } from "./ui/button";
import * as fakeData from '@/lib/fakeData';
import { useState } from "react";

export default function SendRandomItems() {

    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    function sendFakeData() {
        setLoading(true);
        setSuccess(false);

        var items = [];
        for (let i = 0; i < 20; i++) {
            items.push(fakeData.fakeData());
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
                {loading && <><Loader2 className="mr-2 h-4 w-4" />Sending...</>}
                {success && <><CheckCheck className="mr-2 h-4 w-4" />Send another batch?</>}
                {!loading && !success && <><SendHorizontal className="mr-2 h-4 w-4" />Send random batch</>}
            </Button>
        </>
    );
}
