import { useEffect, useState } from 'react';
import * as fakeData from '@/lib/fakeData';
import { Button } from '@/components/ui/button';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { EditBagsDialog } from './EditBagsDialog';
import CancelTransactionButton from './CancelTransactionButton';

export function TransactionTable({ userId }) {

    const [transactions, setTransactions] = useState({ Items: [] });

    const passport = fakeData.users[userId - 1].passport_number;

    function getUserData() {
        const response = fetch('/api/flights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ passport_number: passport }),
        }).then(async (response) => {
            setTransactions(await response.json())
        });
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <Table>
            <TableCaption>Your flights</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Airline</TableHead>
                    <TableHead>Bags</TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    [...transactions.Items].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 9).map((transaction) => (
                        <TableRow key={transaction.transaction_id}>
                            <TableCell className="font-medium">{transaction.transaction_id}</TableCell>
                            <TableCell className="font-medium">{transaction.flight_from}</TableCell>
                            <TableCell className="font-medium">{transaction.flight_to}</TableCell>
                            <TableCell className="font-medium">{transaction.airline}</TableCell>
                            <TableCell className="font-medium">{transaction.extra_bags}</TableCell>
                            <TableCell>
                                <EditBagsDialog
                                    currentBags={transaction.extra_bags}
                                    transactionId={transaction.transaction_id}
                                    onEdit={getUserData}
                                />
                            </TableCell>
                            <TableCell>
                                <CancelTransactionButton transactionId={transaction.transaction_id} onEdit={getUserData}></CancelTransactionButton>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}
