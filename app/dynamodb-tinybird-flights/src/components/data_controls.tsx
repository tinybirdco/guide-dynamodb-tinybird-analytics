"use client";

import SendFakeBookings from '@/components/send_fake_bookings';
import { User } from "@/lib/users";

export default function DataControls({ user, onDataSent }: { user: User, onDataSent: () => void }) {
    return (
        <div id="dataControls">
            <span className="align-middle">Fake data:</span>
            <div className="flex gap-2">
                <SendFakeBookings amount={1} type="user" now={false} user={user} button_text="1 row from current user" callback={onDataSent} />
                <SendFakeBookings amount={1} type="company" now={false} user={user} button_text="1 row from current company" callback={onDataSent} />
                <SendFakeBookings amount={20} type="company" now={false} user={user} button_text="20 rows from current company" callback={onDataSent} />
                <SendFakeBookings amount={20} type="random" now={false} user={user} button_text="20 rows from random users" callback={onDataSent} />
            </div>
        </div>
    );
}


