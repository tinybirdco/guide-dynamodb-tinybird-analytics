"use client";

import SendRandomItems from "@/components/SendRandomItems";
import SendUserItem from '@/components/SendUserItem';
import SendCompanyItem from '@/components/SendCompanyItem';
import { User } from "@/lib/fakeData";

export default function DataControls({ user, onUpdate }: { user: User, onUpdate: () => void }) {
    return (
        <div id="dataControls">
            <span className="align-middle">Fake data:</span>
            <div className="flex gap-2">
                <SendUserItem user={user} onUpdate={onUpdate} />
                <SendCompanyItem user={user} onUpdate={onUpdate} />
                <SendRandomItems amount={1} />
                <SendRandomItems amount={20} />
            </div>
        </div>
    );
}


