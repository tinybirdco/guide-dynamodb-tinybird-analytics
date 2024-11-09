"use client";
import { SendHorizontal, Loader2, CheckCheck } from "lucide-react";
import { Button } from "./ui/button";
import { fakeCompanyData, User } from '@/lib/fakeData';
import { useState } from "react";


export default function SendCompanyItem({ user, onUpdate }: { user: User, onUpdate: () => void }) {

    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    function sendFakeData(user: User) {
        setLoading(true);
        setSuccess(false);
        const response = fetch('/api/flights', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fakeCompanyData(false)),
        }).then((response) => {
            setLoading(false);
            setSuccess(true);
            onUpdate();
        });
    };

    return (
        <>
            <Button disabled={loading} onClick={() => { sendFakeData(user) }}>
                {loading && <Loader2 className="mr-2 h-4 w-4" />}
                {success && <CheckCheck className="mr-2 h-4 w-4" />}
                {!loading && !success && <SendHorizontal className="mr-2 h-4 w-4" />}
                1 row from Tinybird (past 30 days)
            </Button>
        </>
    );
}
