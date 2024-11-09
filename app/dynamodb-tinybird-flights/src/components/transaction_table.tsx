import { useEffect, useState } from 'react';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { EditBagsDialog } from '@/components/edit_bags_dialog';
import CancelTransactionButton from '@/components/cancel_transaction_button';
import { User } from '@/lib/users';
import { Booking } from '@/lib/bookings';

export function TransactionTable({ user }: { user: User }) {

    const [transactions, setTransactions] = useState<Booking[]>([]);

    function getUserData() {
        const response = fetch(`/api/flights/${user.company}/${user.email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (response) => {
            const data = await response.json();
            setTransactions(data);
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
                    [...transactions].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 9).map((transaction) => (
                        <TableRow key={transaction.transaction_id}>
                            <TableCell className="font-medium">{transaction.flight_from}</TableCell>
                            <TableCell className="font-medium">{transaction.flight_to}</TableCell>
                            <TableCell className="font-medium">{transaction.airline}</TableCell>
                            <TableCell className="font-medium">{transaction.extra_bags}</TableCell>
                            <TableCell>
                                <EditBagsDialog
                                    currentBags={transaction.extra_bags}
                                    transactionId={transaction.transaction_id}
                                    email={transaction.email}
                                    company={transaction.company}
                                    onEdit={getUserData}
                                />
                            </TableCell>
                            <TableCell>
                                <CancelTransactionButton
                                    transactionId={transaction.transaction_id}
                                    email={transaction.email}
                                    company={transaction.company}
                                    onEdit={getUserData}
                                ></CancelTransactionButton>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}
