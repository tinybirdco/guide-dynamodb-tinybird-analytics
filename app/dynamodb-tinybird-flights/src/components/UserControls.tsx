"use client";
import { Button } from "./ui/button";
import { users } from "../lib/fakeData";

export default function UserControls({ userId, onClick }: { userId: number, onClick: (id: number) => void }) {
    return (
        <div id="userControls">
            <span className="align-middle">User toggle:</span>
            <div className="flex gap-2">
                {users.map((user, index) => (
                    <Button key={index} variant="secondary" onClick={() => { onClick(index + 1) }}>{user.name + ' - ' + user.role}</Button>
                ))}
            </div>
        </div>
    );
}
