"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import FlightsContext from "@/stores/flights";
import Container from "@/components/container";
import FlightItem from "@/components/flight_item";
import FlightsSidebar from "@/components/flights_sidebar";
import Header from "@/components/header";
import { Skeleton } from "@/components/ui/skeleton";

export default function Flights() {
  const { fetchFligths, flights, isLoading } = useContext(FlightsContext);
  const searchParams = useSearchParams();
  const arrivalAirport = searchParams.get("arrivalAirport") as string;
  const departureAirport = searchParams.get("departureAirport") as string;

  useEffect(() => {
    if (!flights.length) {
      setTimeout(() => {
        fetchFligths(departureAirport, arrivalAirport);
      }, 2000);
    }
  }, []);

  return (
    <div className="h-screen">
      <Header className="sticky top-0 left-0 z-50" />
      <Container className="h-full" classNameContent="pt-6">
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
          {isLoading &&
            Array.from(new Array(10)).map((_, index) => (
              <Skeleton
                key={`flights-skeleton-${index}`}
                className="w-full h-[87px] rounded-[6px]"
              />
            ))}
        </div>
      </Container>
    </div>
  );
}
