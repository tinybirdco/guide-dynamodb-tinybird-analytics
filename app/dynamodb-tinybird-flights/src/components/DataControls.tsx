"use client";

import SendRandomItems from "@/components/SendRandomItems";
import SendUserItem from '@/components/SendUserItem';

export default function DataControls({ userId, onUpdate }: { userId: number, onUpdate: () => void }) {
    return (
        <div id="dataControls">
            <span className="align-middle">Fake data:</span>
            <div className="flex gap-2">
                <SendUserItem userId={userId} onUpdate={onUpdate} />
                <SendRandomItems amount={1} />
                <SendRandomItems amount={20} />
            </div>
        </div>
    );
}


