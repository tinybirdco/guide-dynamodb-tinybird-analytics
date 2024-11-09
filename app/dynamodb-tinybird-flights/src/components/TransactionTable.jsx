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

    const email = fakeData.users[userId - 1].email;
    const company = fakeData.users[userId - 1].company;


    function getUserData() {
        const response = fetch(`/api/flights/${company}/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (response) => {
            const data = await response.json();
            setTransactions(data);
            console.log(data);
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
                    {/* <TableHead>ID</TableHead> */}
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
                        <TableRow key={transaction['email#transaction_id']}>
                            <TableCell className="font-medium">{transaction.flight_from}</TableCell>
                            <TableCell className="font-medium">{transaction.flight_to}</TableCell>
                            <TableCell className="font-medium">{transaction.airline}</TableCell>
                            <TableCell className="font-medium">{transaction.extra_bags}</TableCell>
                            <TableCell>
                                <EditBagsDialog
                                    currentBags={transaction.extra_bags}
                                    transactionId={transaction['email#transaction_id'].split('#')[1]}
                                    email={transaction['email#transaction_id'].split('#')[0]}
                                    company={transaction.company}
                                    onEdit={getUserData}
                                />
                            </TableCell>
                            <TableCell>
                                <CancelTransactionButton
                                    transactionId={transaction['email#transaction_id'].split('#')[1]}
                                    email={transaction['email#transaction_id'].split('#')[0]}
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
