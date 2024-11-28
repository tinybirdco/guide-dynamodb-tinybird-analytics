"use client";

import { useContext, useEffect, useState } from "react";
import { Booking } from "@/lib/bookings";
import UserContext from "@/stores/user";
import Container from "@/components/container";
import Header from "@/components/header";
import FlightItem from "@/components/flight_item";
import { Button } from "@/components/ui/button";

export default function UserFlights() {
  const { user } = useContext(UserContext);
  const [transactions, setTransactions] = useState<Booking[]>([]);

  const getUserData = async () => {
    const response = await fetch(`/api/flights/${user.company}/${user.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setTransactions(data);
  };

  const onDeleteFlight = async (transactionId: string) => {
    await fetch(`/api/flights/${user.company}/${user.email}/${transactionId}`, {
      method: "DELETE",
    });
    getUserData();
  };

  const renderActions = (transactionId: string) => {
    return (
      <div className="flex gap-2 items-center pr-6">
        <Button
          variant="destructive"
          onClick={() => onDeleteFlight(transactionId)}
        >
          Cancel
        </Button>
      </div>
    );
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="h-screen">
      <Header className="sticky top-0 left-0 z-50" />
      <Container className="h-full" classNameContent="pt-6">
        <div className="col-span-10 col-start-2">
          <div className="text-[#474849] text-[20px] font-semibold leading-normal mb-6">
            My flights
          </div>
          {transactions.map((item) => (
            <FlightItem
              actions={renderActions(item.transaction_id)}
              airline={item.airline}
              arrivalAirport={item.flight_to}
              arrivalTime={item.arrival_time}
              departureAirport={item.flight_from}
              departureTime={item.departure_time}
              duration={item.duration}
              key={`${item.airline}-${item.cost}`}
              price={item.cost}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
