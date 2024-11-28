"use client";
import { SendHorizontal, Loader2, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fakeCompanyData, fakeData, fakeUserData } from "@/lib/fake_data";
import { useState } from "react";
import { User, users } from "@/lib/users";

export default function SendFakeBookings({
  amount,
  type,
  now,
  user,
  button_text,
  callback,
}: {
  amount: number;
  type: "random" | "user" | "company";
  now: boolean;
  user?: User;
  button_text: string;
  callback?: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  function sendFakeData() {
    setLoading(true);
    setSuccess(false);

    var items = [];
    for (let i = 0; i < amount; i++) {
      if (type === "random") {
        items.push(fakeData(now));
      } else if (type === "user") {
        items.push(fakeUserData(user ?? users[0], now));
      } else if (type === "company") {
        items.push(fakeCompanyData(now));
      }
    }

    const response = fetch("/api/flights/bulk", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    }).then((response) => {
      setLoading(false);
      setSuccess(true);
      callback?.();
    });
  }

  return (
    <>
      <Button
        disabled={loading}
        onClick={() => {
          sendFakeData();
        }}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4" />}
        {success && <CheckCheck className="mr-2 h-4 w-4" />}
        {!loading && !success && <SendHorizontal className="mr-2 h-4 w-4" />}
        {button_text}
      </Button>
    </>
  );
}
