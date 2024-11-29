import DataControls from "@/components/data_controls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserControls from "@/components/user_controls";
import { User } from "@/lib/users";

export default function DemoControls({ user, callback }: { user: User, callback: (uid?: number) => void }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Demo controls</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <UserControls user={user} onUserChanged={(uid) => callback(uid)} />
                <DataControls user={user} onDataSent={() => callback(undefined)} />
            </CardContent>
        </Card>
    );
}
