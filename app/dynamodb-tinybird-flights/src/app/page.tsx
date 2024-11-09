"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import UserControls from '@/components/UserControls';
import { useState } from 'react';
import DataControls from "@/components/DataControls";
import UserDashboard from "@/components/UserDashboard";
import { User } from "@/lib/fakeData";
import { users } from "@/lib/fakeData";
import AdminDashboard from "@/components/AdminDashboard";

export default function Home() {

  const [tableKey, setTableKey] = useState<number>(0);
  const [user, setUser] = useState<User>(users[0]);

  function changeUser(uid?: number) {
    if (uid !== undefined) {
      setTableKey(tableKey + 1);
      setUser(users[uid]);
    } else {
      // just a hack to force a re-render
      setTableKey(tableKey + 1);
      setUser(user);
    }
  }

  return (
    <main className='w-3/4 mx-auto mt-4 pb-16'>
      <h1 className='text-2xl mb-8'>Tinybird + DynamoDB Flights Demo</h1>
      <Card>
        <CardHeader>
          <CardTitle>Demo controls</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <UserControls user={user} onClick={(uid) => changeUser(uid)} />
          <DataControls user={user} onUpdate={() => changeUser() /** hack to force a re-render */} />
        </CardContent>
      </Card>
      <div className="mt-4">
        {user.role === "member" ?
          <UserDashboard user={user} tableKey={tableKey} />
          :
          <AdminDashboard user={user} tableKey={tableKey} />
        }
      </div>
    </main>
  );
}
