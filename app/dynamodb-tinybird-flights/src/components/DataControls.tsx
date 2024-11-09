"use client";

import SendRandomItems from "@/components/SendRandomItems";
import SendUserItem from '@/components/SendUserItem';
import SendCompanyItem from '@/components/SendCompanyItem';
import { User } from "@/lib/users";

export default function DataControls({ user, onDataSent }: { user: User, onDataSent: () => void }) {
    return (
        <div id="dataControls">
            <span className="align-middle">Fake data:</span>
            <div className="flex gap-2">
                <SendUserItem user={user} onDataSent={onDataSent} />
                <SendCompanyItem user={user} onDataSent={onDataSent} />
                <SendRandomItems amount={1} />
                <SendRandomItems amount={20} />
            </div>
        </div>
    );
}


