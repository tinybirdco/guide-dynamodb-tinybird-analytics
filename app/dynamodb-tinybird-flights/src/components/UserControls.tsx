"use client";
import { Button } from "./ui/button";
import * as fakeData from "../lib/fakeData";

export default function UserControls({ user, onClick }: { user: fakeData.User, onClick: (id: number) => void }) {
    return (
        <div id="userControls">
            <span className="align-middle">User toggle:</span>
            <div className="flex gap-2">
                {fakeData.users.map((user, index) => (
                    <Button key={index} variant="secondary" onClick={() => { onClick(index) }}>{user.name + ' - ' + user.role}</Button>
                ))}
            </div>
        </div>
    );
}
