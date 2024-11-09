"use client";

import { SendHorizontal, Loader2, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fakeUserData } from "@/lib/fake_data";
import { User } from "@/lib/users";
import { useState } from "react";

export default function SendUserItem({ user, onDataSent }: { user: User, onDataSent: () => void }) {

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
            body: JSON.stringify(fakeUserData(user)),
        }).then((response) => {
            setLoading(false);
            setSuccess(true);
            onDataSent();
        });
    };

    return (
        <>
            <Button disabled={loading} onClick={() => { sendFakeData(user) }}>
                {loading && <Loader2 className="mr-2 h-4 w-4" />}
                {success && <CheckCheck className="mr-2 h-4 w-4" />}
                {!loading && !success && <SendHorizontal className="mr-2 h-4 w-4" />}
                1 row from current user
            </Button>
        </>
    );
}
