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
import AirlineDashboard from "@/components/AirlineDashboard";

export default function Home() {

  const [userId, setUserId] = useState<number>(1);
  const [tableKey, setTableKey] = useState<number>(0);

  function updateUserId(uid: number) {
    setUserId(uid);
    setTableKey(tableKey + 1);
  }

  return (
    <main className='w-3/4 mx-auto mt-4 pb-16'>
      <h1 className='text-2xl mb-8'>Tinybird + DynamoDB Flights Demo</h1>
      <Card>
        <CardHeader>
          <CardTitle>Demo controls</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <UserControls userId={userId} onClick={(uid) => updateUserId(uid)} />
          <DataControls userId={userId} onUpdate={() => updateUserId(userId)} />
        </CardContent>
      </Card>
      <div className="mt-4">
        {userId <= 3 ?
          <UserDashboard userId={userId} tableKey={tableKey} />
          :
          <AirlineDashboard userId={userId} tableKey={tableKey} />
        }
      </div>
    </main>
  );
}
