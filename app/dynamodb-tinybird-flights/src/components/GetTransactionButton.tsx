"use client";
import { Button } from "./ui/button";

export default function GetUserDataButton({ transactionId }: { transactionId: string }) {

    function getTransaction() {
        const response = fetch('/api/flights/' + transactionId, {
            method: 'GET',
        }).then((response) => console.log(response.json()));
    };

    return (
        <>
            <Button onClick={() => { getTransaction() }}>Get transaction</Button>
        </>
    );
}
