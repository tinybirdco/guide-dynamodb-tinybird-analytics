"use client";
import { Button } from "./ui/button";

export default function CancelTransactionButton({ transactionId, email, company, onEdit }: { transactionId: string, email: string, company: string, onEdit: () => void }) {

    function deleteTransaction() {
        console.log(company, email, transactionId);
        const response = fetch('/api/flights/' + company + '/' + email + '/' + transactionId, {
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
