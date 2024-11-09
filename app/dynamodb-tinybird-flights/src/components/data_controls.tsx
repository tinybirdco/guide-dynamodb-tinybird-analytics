"use client";

import SendRandomItems from "@/components/send_random_items";
import SendUserItem from '@/components/send_user_item';
import SendCompanyItem from '@/components/send_company_item';
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


