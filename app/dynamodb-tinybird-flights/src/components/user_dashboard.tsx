"use client";

import { User } from "@/lib/users";
import { TransactionTable } from '@/components/transaction_table';

export default function UserDashboard({ user, tableKey }: { user: User, tableKey: number }) {
    return (
        <>
            <h2 className="text-xl mb-4">Your flights</h2>
            <p className="mb-4">Hello, {user.name}!</p>
            <p className="mb-4">View and manage your flight bookings below:</p>
            <TransactionTable key={tableKey} user={user} />
        </>
    );
}