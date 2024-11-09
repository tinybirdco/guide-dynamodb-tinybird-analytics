"use client";
import { SendHorizontal, Loader2, CheckCheck } from "lucide-react";
import { Button } from "./ui/button";
import * as fakeData from '@/lib/fakeData';
import { useState } from "react";


export default function SendUserItem({ user, onUpdate }: { user: fakeData.User, onUpdate: () => void }) {

    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    function sendFakeData(user: fakeData.User) {
        setLoading(true);
        setSuccess(false);
        const response = fetch('/api/flights', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fakeData.fakeData(user)),
        }).then((response) => {
            setLoading(false);
            setSuccess(true);
            onUpdate();
        });
    };

    return (
        <>
            <Button disabled={loading} onClick={() => { sendFakeData(user) }}>
                {loading && <><Loader2 className="mr-2 h-4 w-4" />Sending...</>}
                {success && <><CheckCheck className="mr-2 h-4 w-4" />Send more?</>}
                {!loading && !success && <><SendHorizontal className="mr-2 h-4 w-4" />1 row from current user</>}
            </Button>
        </>
    );
}
