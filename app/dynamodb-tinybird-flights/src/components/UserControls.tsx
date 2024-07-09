"use client";
import { Button } from "./ui/button";

export default function UserControls({ userId, onClick }: { userId: number, onClick: (id: number) => void }) {
    return (
        <div id="userControls">
            <span className="align-middle">User toggle:</span>
            <div className="flex gap-2">
                <Button variant={userId === 1 ? "destructive" : "secondary"} onClick={() => { onClick(1) }}>Traveller 1</Button>
                <Button variant={userId === 2 ? "destructive" : "secondary"} onClick={() => { onClick(2) }}>Traveller 2</Button>
                <Button variant={userId === 3 ? "destructive" : "secondary"} onClick={() => { onClick(3) }}>Traveller 3</Button>
                <Button variant={userId === 4 ? "destructive" : "outline"} onClick={() => { onClick(4) }}>BrianAir</Button>
                <Button variant={userId === 5 ? "destructive" : "outline"} onClick={() => { onClick(5) }}>Ler Dingus</Button>
                <Button variant={userId === 6 ? "destructive" : "outline"} onClick={() => { onClick(6) }}>Red Balloon</Button>
            </div>
        </div>
    );
}
