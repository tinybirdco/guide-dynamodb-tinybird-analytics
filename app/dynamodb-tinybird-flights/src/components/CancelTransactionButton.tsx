"use client";
import { Button } from "./ui/button";

export default function CancelTransactionButton({ transactionId, onEdit }: { transactionId: string, onEdit: () => void }) {

    function deleteTransaction() {
        const response = fetch('/api/flights/' + transactionId, {
            method: 'DELETE',
        }).then(async (response) => {
            const result = await response.json();
            if (result == 200) {
                onEdit();
            }
        });
    };

    return (
        <>
            <Button variant="destructive" onClick={() => { deleteTransaction() }}>Cancel</Button>
        </>
    );
}
