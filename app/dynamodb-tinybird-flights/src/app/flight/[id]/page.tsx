"use client";

import { useContext } from "react";
import { redirect, useParams } from "next/navigation";
import FlightsContext from "@/stores/flights";
import Container from "@/components/container";
import FlightItem from "@/components/flight_item";
import FlightsSidebar from "@/components/flights_sidebar";
import Header from "@/components/header";
import FlightForm from "@/components/flight_form";

export default function FlightId() {
  const params = useParams();
  const { arrivalAirport, departureAirport, flights, isLoading } =
    useContext(FlightsContext);
  const flight = flights.find((item) => item.id === params.id);

  if (!flight || !arrivalAirport || !departureAirport) {
    redirect("/");
  }

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
          <FlightItem
            airline={flight.airline}
            arrivalAirport={arrivalAirport}
            arrivalTime={flight.arrivalTime}
            departureAirport={departureAirport}
            departureTime={flight.departureTime}
            duration={flight.duration}
            price={flight.price}
          />
          <FlightForm className="mt-10" flight={flight} />
        </div>
      </Container>
    </div>
  );
}
