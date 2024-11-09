"use client";

import { useState } from 'react';
import UserDashboard from "@/components/user_dashboard";
import AdminDashboard from "@/components/admin_dashboard";
import DemoControls from "@/components/demo_controls";
import { User, users } from "@/lib/users";

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
      <DemoControls user={user} callback={(uid) => changeUser(uid)} />
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
