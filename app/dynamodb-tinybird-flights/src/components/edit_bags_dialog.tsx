import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react";

export function EditBagsDialog({ currentBags, transactionId, company, email, onEdit }: { currentBags: number, transactionId: string, company: string, email: string, onEdit: () => void }) {

    const [newBags, setNewBags] = useState(currentBags);

    const updateBags = () => {
        const response = fetch('/api/flights/' + company + '/' + email + '/' + transactionId + '/bags', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ extra_bags: newBags }),
        }).then(async (response) => {
            const result = await response.json();
            if (result == 200) {
                onEdit();
            }
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit bags</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Change bags</DialogTitle>
                    <DialogDescription>
                        Update bag count
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Input
                            id="link"
                            value={newBags}
                            onChange={(e) => setNewBags(Number(e.target.value))}
                        />
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={updateBags}>
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
