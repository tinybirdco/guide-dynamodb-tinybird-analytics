"use client";

import * as fakeData from '@/lib/fakeData';
import { TransactionTable } from '@/components/TransactionTable';

export default function UserDashboard({ userId, tableKey }: { userId: number, tableKey: number }) {
    return (
        <>
            <h2 className="text-xl mb-4">Your flights</h2>
            <p className="mb-4">Hello, {fakeData.users[userId - 1].name}!</p>
            <p className="mb-4">View and manage your flight bookings below:</p>
            <TransactionTable key={tableKey} userId={userId} />
        </>
    );
}