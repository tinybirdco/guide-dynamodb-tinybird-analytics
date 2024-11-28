"use client";

import { Button } from "@/components/ui/button";
import { User, users } from "@/lib/users";

export default function UserControls({
  user: currentUser,
  onUserChanged,
}: {
  user: User;
  onUserChanged: (id: number) => void;
}) {
  return (
    <div id="userControls">
      <span className="align-middle">User toggle:</span>
      <div className="flex flex-wrap gap-2">
        {users.map((user, index) => (
          <Button
            key={index}
            variant={currentUser.email === user.email ? "default" : "secondary"}
            onClick={() => {
              onUserChanged(index);
            }}
          >
            {user.name + " - " + user.role}
          </Button>
        ))}
      </div>
    </div>
  );
}
