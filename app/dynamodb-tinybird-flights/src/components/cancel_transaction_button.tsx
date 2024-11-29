"use client";
import { Button } from "@/components/ui/button";

export default function CancelTransactionButton({ transactionId, email, company, onEdit }: { transactionId: string, email: string, company: string, onEdit: () => void }) {

    function deleteTransaction() {
        const response = fetch('/api/flights/' + company + '/' + email + '/' + transactionId, {
            method: 'DELETE',
        }).then(async (response) => {
            if (response.status == 200) {
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
