"use client";

import { createContext, useState } from "react";
import { Flight, generateRandomFlights } from "@/lib/flights";

type ContextValue = {
  arrivalAirport: string | undefined;
  departureAirport: string | undefined;
  fetchFligths: (departureDate: string, arrivalDate: string) => void;
  flights: Flight[];
  isLoading: boolean;
  resetFligths: () => void;
};

export const FlightsContext = createContext({} as ContextValue);

type Props = {
  children: React.ReactNode;
};

export const FlightsProvider = ({ children }: Props) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [departureAirport, setDepartureAirport] = useState<
    string | undefined
  >();
  const [arrivalAirport, setArrivalAirport] = useState<string | undefined>();
  const isLoading = !flights.length;

  const fetchFligths = (
    fetchDepartureAirport: string,
    fetchArrivalAirport: string
  ) => {
    setDepartureAirport(fetchDepartureAirport);
    setArrivalAirport(fetchArrivalAirport);
    setFlights(generateRandomFlights(10));
  };

  const resetFligths = () => {
    setFlights([]);
  };

  return (
    <FlightsContext.Provider
      value={{
        arrivalAirport,
        departureAirport,
        fetchFligths,
        flights,
        isLoading,
        resetFligths,
      }}
    >
      {children}
    </FlightsContext.Provider>
  );
};

export default FlightsContext;
