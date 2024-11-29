"use client";

import { useContext, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import FlightsContext from "@/stores/flights";
import Container from "@/components/container";
import FlightItem from "@/components/flight_item";
import FlightsSidebar from "@/components/flights_sidebar";
import Header from "@/components/header";
import { Skeleton } from "@/components/ui/skeleton";

function FlightsContent() {
  const { fetchFligths, flights, isLoading } = useContext(FlightsContext);
  const searchParams = useSearchParams();
  const arrivalAirport = searchParams.get("arrivalAirport") as string;
  const departureAirport = searchParams.get("departureAirport") as string;

  useEffect(() => {
    if (!flights.length) {
      setTimeout(() => {
        fetchFligths(departureAirport, arrivalAirport);
      }, 500);
    }
  }, []);

  return (
    <div className="h-screen">
      <Header className="sticky top-0 left-0 z-50" />
      <Container className="h-full" classNameContent="py-6">
        <FlightsSidebar
          className="col-span-3"
          flights={flights}
          isLoading={isLoading}
        />
        <div className="col-span-9 flex flex-col gap-4">
          {!isLoading &&
            flights.map((item) => (
              <Link
                className="group"
                href={`/flight/${item.id}`}
                key={`${item.airline}-${item.price}`}
              >
                <FlightItem
                  airline={item.airline}
                  arrivalAirport={arrivalAirport}
                  arrivalTime={item.arrivalTime}
                  departureAirport={departureAirport}
                  departureTime={item.departureTime}
                  duration={item.duration}
                  price={item.price}
                />
              </Link>
            ))}
          {isLoading && (
            <>
              <Skeleton className="h-[120px] w-full rounded-lg" />
              <Skeleton className="h-[120px] w-full rounded-lg" />
              <Skeleton className="h-[120px] w-full rounded-lg" />
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

export default function Flights() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlightsContent />
    </Suspense>
  );
}
