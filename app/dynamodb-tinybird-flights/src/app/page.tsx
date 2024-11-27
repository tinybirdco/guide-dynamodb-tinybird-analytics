"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import FlightsContext from "@/stores/flights";
import { User, users } from "@/lib/users";
import airports from "@/lib/airports.json";
import UserDashboard from "@/components/user_dashboard";
import AdminDashboard from "@/components/admin_dashboard";
import DemoControls from "@/components/demo_controls";
import Header from "@/components/header";
import Container from "@/components/container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import bgImage from "./assets/bg.png";

export default function Home() {
  const router = useRouter();
  const { resetFligths } = useContext(FlightsContext);
  const [tableKey, setTableKey] = useState<number>(0);
  const [user, setUser] = useState<User>(users[0]);
  const [departureAirport, setDepartureAirport] = useState<string>();
  const [arrivalAirport, setArrivalAirport] = useState<string>();
  const [departureDate, setDepartureDate] = useState<Date>();
  const [arrivalDate, setArrivalDate] = useState<Date>();
  const [passengers, setPassengers] = useState<string>();
  const isSearchEnabled =
    !!departureAirport &&
    !!arrivalAirport &&
    !!departureDate &&
    !!arrivalDate &&
    !!passengers;

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

  const onSearch = () => {
    if (isSearchEnabled) {
      resetFligths();
      const params = new URLSearchParams({
        arrivalAirport,
        arrivalDate: format(arrivalDate, "dd/MM/yyyy"),
        departureAirport,
        departureDate: format(departureDate, "dd/MM/yyyy"),
        passengers,
      });

      router.push(`/flights?${params.toString()}`);
    }
  };

  return (
    <>
      <div className="h-screen pt-[68px]">
        <Header className="absolute top-0 left-0" />
        <Container
          className="bg-cover h-full"
          classNameContent="pt-16"
          style={{
            backgroundImage: `url("${bgImage.src}")`,
            backgroundPosition: "bottom right",
          }}
        >
          <div className="col-span-full flex gap-2">
            <div className="flex items-center py-2 px-4 bg-[rgba(82,82,82,0.10)] border border-white rounded-[94px] text-white text-[15px] leading-5 tracking-[0.3px]">
              Flights
            </div>
            <div className="flex items-center py-2 px-4 bg-[rgba(82,82,82,0.10)] border border-white rounded-[94px] text-white text-[15px] leading-5 tracking-[0.3px]">
              Hotels
            </div>
            <div className="flex items-center py-2 px-4 bg-[rgba(82,82,82,0.10)] border border-white rounded-[94px] text-white text-[15px] leading-5 tracking-[0.3px]">
              Car rental
            </div>
          </div>
          <div className="col-span-full text-white text-[64px] font-bold leading-[64px] mt-6">
            Millions of cheap flights.
            <br />
            One simple search.
          </div>
          <div className="col-span-full flex gap-3 mt-8 p-2 bg-white rounded-[8px] shadow-[0_4px_37px_0_rgba(0,0,0,0.15)]">
            <Select onValueChange={(value) => setDepartureAirport(value)}>
              <SelectTrigger className="flex-1">
                <div className="flex items-center gap-[10px] bg-[#F2F2F2] p-3 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      d="M2.88461 19.5H21.8846V21.5H2.88461V19.5ZM22.4546 10.14C22.2446 9.34001 21.4146 8.86001 20.6146 9.08001L15.3046 10.5L8.38461 4.07001L6.47461 4.58001L10.6146 11.75L5.64461 13.08L3.67461 11.54L2.22461 11.93L4.04461 15.09L4.81461 16.42L6.41461 16L11.7246 14.57L16.0746 13.41L21.3846 12C22.1946 11.76 22.6646 10.94 22.4546 10.14Z"
                      fill="#4F4F4F"
                      fillOpacity="0.6"
                    />
                  </svg>
                  <div className="text-[#4F4F4F]  text-[14px] leading-[140%] tracking-[0.28px]">
                    {departureAirport || "Origin"}
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent>
                {airports.map((item) => (
                  <SelectItem
                    key={`from-${item.iata_code}`}
                    value={item.iata_code}
                  >
                    {item.iata_code} ({item.name})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setArrivalAirport(value)}>
              <SelectTrigger className="flex-1">
                <div className="flex items-center gap-[10px] bg-[#F2F2F2] p-3 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      d="M2.88477 19.5H21.8848V21.5H2.88477V19.5ZM10.0648 13.77L14.4148 14.93L19.7248 16.35C20.5248 16.56 21.3448 16.09 21.5648 15.29C21.7748 14.5 21.3048 13.67 20.5048 13.45L15.1948 12.03L12.4348 3L10.5048 2.5V10.78L5.53477 9.45L4.60477 7.13L3.15477 6.74V11.91L4.75477 12.34L10.0648 13.77Z"
                      fill="#4F4F4F"
                      fillOpacity="0.6"
                    />
                  </svg>
                  <div className="text-[#4F4F4F]  text-[14px] leading-[140%] tracking-[0.28px]">
                    {arrivalAirport || "Destination"}
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent>
                {airports.map((item) => (
                  <SelectItem
                    key={`to-${item.iata_code}`}
                    value={item.iata_code}
                  >
                    {item.iata_code} ({item.name})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex-1 flex items-center gap-[10px] bg-[#F2F2F2] p-3 rounded cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      d="M19.3848 19.5H5.38477V8.5H19.3848M16.3848 1.5V3.5H8.38477V1.5H6.38477V3.5H5.38477C4.27477 3.5 3.38477 4.39 3.38477 5.5V19.5C3.38477 20.0304 3.59548 20.5391 3.97055 20.9142C4.34562 21.2893 4.85433 21.5 5.38477 21.5H19.3848C19.9152 21.5 20.4239 21.2893 20.799 20.9142C21.1741 20.5391 21.3848 20.0304 21.3848 19.5V5.5C21.3848 4.39 20.4848 3.5 19.3848 3.5H18.3848V1.5"
                      fill="#4F4F4F"
                      fillOpacity="0.6"
                    />
                  </svg>
                  <div className="text-[#4F4F4F]  text-[14px] leading-[140%] tracking-[0.28px]">
                    {departureDate
                      ? format(departureDate, "dd/MM/yyyy")
                      : "Departure date"}
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={departureDate}
                  onSelect={setDepartureDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex-1 flex items-center gap-[10px] bg-[#F2F2F2] p-3 rounded cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      d="M19.3848 19.5H5.38477V8.5H19.3848M16.3848 1.5V3.5H8.38477V1.5H6.38477V3.5H5.38477C4.27477 3.5 3.38477 4.39 3.38477 5.5V19.5C3.38477 20.0304 3.59548 20.5391 3.97055 20.9142C4.34562 21.2893 4.85433 21.5 5.38477 21.5H19.3848C19.9152 21.5 20.4239 21.2893 20.799 20.9142C21.1741 20.5391 21.3848 20.0304 21.3848 19.5V5.5C21.3848 4.39 20.4848 3.5 19.3848 3.5H18.3848V1.5"
                      fill="#4F4F4F"
                      fillOpacity="0.6"
                    />
                  </svg>
                  <div className="text-[#4F4F4F]  text-[14px] leading-[140%] tracking-[0.28px]">
                    {arrivalDate
                      ? format(arrivalDate, "dd/MM/yyyy")
                      : "Return date"}
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={arrivalDate}
                  onSelect={setArrivalDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Select onValueChange={(value) => setPassengers(value)}>
              <SelectTrigger className="flex-1">
                <div className="flex items-center gap-[10px] bg-[#F2F2F2] p-3 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      d="M16.3848 17.5V19.5H2.38477V17.5C2.38477 17.5 2.38477 13.5 9.38477 13.5C16.3848 13.5 16.3848 17.5 16.3848 17.5ZM12.8848 7.99999C12.8848 7.30776 12.6795 6.63107 12.2949 6.0555C11.9103 5.47992 11.3637 5.03132 10.7242 4.76641C10.0846 4.50151 9.38088 4.43219 8.70195 4.56724C8.02302 4.70229 7.39938 5.03563 6.90989 5.52512C6.42041 6.0146 6.08707 6.63824 5.95202 7.31718C5.81697 7.99611 5.88628 8.69984 6.15119 9.33938C6.41609 9.97892 6.8647 10.5256 7.44027 10.9101C8.01584 11.2947 8.69253 11.5 9.38477 11.5C10.313 11.5 11.2033 11.1312 11.8596 10.4749C12.516 9.81849 12.8848 8.92825 12.8848 7.99999ZM16.3248 13.5C16.9395 13.9757 17.4425 14.5804 17.7984 15.2715C18.1543 15.9626 18.3545 16.7232 18.3848 17.5V19.5H22.3848V17.5C22.3848 17.5 22.3848 13.87 16.3248 13.5ZM15.3848 4.49999C14.6965 4.49616 14.0233 4.70195 13.4548 5.08999C14.0622 5.93873 14.3888 6.95628 14.3888 7.99999C14.3888 9.04371 14.0622 10.0613 13.4548 10.91C14.0233 11.298 14.6965 11.5038 15.3848 11.5C16.313 11.5 17.2033 11.1312 17.8596 10.4749C18.516 9.81849 18.8848 8.92825 18.8848 7.99999C18.8848 7.07173 18.516 6.1815 17.8596 5.52512C17.2033 4.86874 16.313 4.49999 15.3848 4.49999Z"
                      fill="#909090"
                    />
                  </svg>
                  <div className="text-[#4F4F4F]  text-[14px] leading-[140%] tracking-[0.28px]">
                    {passengers
                      ? `${passengers} ${
                          passengers === "1" ? "passenger" : "passengers"
                        }`
                      : "Passengers"}
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 passenger</SelectItem>
                <SelectItem value="2">2 passengers</SelectItem>
                <SelectItem value="3">3 passengers</SelectItem>
                <SelectItem value="4">4 passengers</SelectItem>
                <SelectItem value="5">5 passengers</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="flex-1 bg-[#2F80ED] h-full"
              disabled={!isSearchEnabled}
              onClick={onSearch}
            >
              Search
            </Button>
          </div>
        </Container>
      </div>
      <main className="w-3/4 mx-auto mt-4 pb-16">
        <h1 className="text-2xl mb-8">Tinybird + DynamoDB Flights Demo</h1>
        <DemoControls user={user} callback={(uid) => changeUser(uid)} />
        <div className="mt-4">
          {user.role === "member" ? (
            <UserDashboard user={user} tableKey={tableKey} />
          ) : (
            <AdminDashboard user={user} />
          )}
        </div>
      </main>
    </>
  );
}
