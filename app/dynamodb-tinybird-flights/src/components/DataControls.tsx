"use client";

import SendRandomItems from "@/components/SendRandomItems";
import SendUserItem from '@/components/SendUserItem';
import * as fakeData from "../lib/fakeData";

export default function DataControls({ user, onUpdate }: { user: fakeData.User, onUpdate: () => void }) {
    return (
        <div id="dataControls">
            <span className="align-middle">Fake data:</span>
            <div className="flex gap-2">
                <SendUserItem user={user} onUpdate={onUpdate} />
                <SendRandomItems amount={1} />
                <SendRandomItems amount={20} />
            </div>
        </div>
    );
}


