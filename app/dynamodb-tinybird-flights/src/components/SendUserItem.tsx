"use client";
import { SendHorizontal, Loader2, CheckCheck } from "lucide-react";
import { Button } from "./ui/button";
import * as fakeData from '@/lib/fakeData';
import { useState } from "react";


export default function SendUserItem({ userId, onUpdate }: { userId: number, onUpdate: () => void }) {

    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    function sendFakeData(userId: number) {
        setLoading(true);
        setSuccess(false);
        const response = fetch('/api/flights', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fakeData.fakeData(userId)),
        }).then((response) => {
            setLoading(false);
            setSuccess(true);
            onUpdate();
        });
    };

    return (
        <>
            <Button disabled={loading || (userId > 3)} onClick={() => { sendFakeData(userId) }}>
                {loading && <><Loader2 className="mr-2 h-4 w-4" />Sending...</>}
                {success && <><CheckCheck className="mr-2 h-4 w-4" />Send more?</>}
                {!loading && !success && <><SendHorizontal className="mr-2 h-4 w-4" />Send data</>}
            </Button>
        </>
    );
}
