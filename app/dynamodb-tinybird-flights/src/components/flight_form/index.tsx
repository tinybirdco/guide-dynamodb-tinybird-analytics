"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Flight } from "@/lib/flights";
import { fakeData } from "@/lib/fake_data";
import UserContext from "@/stores/user";
import FlightsContext from "@/stores/flights";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import ausImage from "./assets/aus.svg";
import mealImage from "./assets/meal.png";
import luggageImage from "./assets/luggage.png";
import upgradeImage from "./assets/upgrade.png";

type Props = {
  className?: string;
  flight: Flight;
};

const FlightForm = ({ className, flight }: Props) => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { arrivalAirport, departureAirport } = useContext(FlightsContext);
  const [passport, setPassport] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const isSubmitEnabled = !!passport && !!mobileNumber;

  const onClickSubmit = async () => {
    const data = fakeData(true);
    const params = {
      items: [
        {
          ...data,
          airline: flight.airline,
          arrival_time: flight.arrivalTime,
          company: user.company,
          cost: flight.price,
          departure_time: flight.departureTime,
          duration: flight.duration,
          email: user.email,
          flight_from: departureAirport,
          flight_to: arrivalAirport,
          name: `${user.name} ${user.surname}`,
          passport_number: passport,
          PK: `COMPANY#${user.company}`,
          SK: `EMAIL#${user.email}#TXID#${data.transaction_id}`,
        },
      ],
    };

    await fetch("/api/flights/bulk", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    router.push("/flight/success");
  };

  return (
    <div className={className}>
      <div className="text-[#474849] text-[20px] font-semibold leading-normal">
        Flights options
      </div>
      <div className="flex gap-9 mt-4">
        <div className="flex flex-col gap-5 p-4 border border-[#C3CAD1] rounded-[8px]">
          <Image alt="" className="w-full" src={mealImage} />
          <div>Pick your meal</div>
          <Button>See options</Button>
        </div>
        <div className="flex flex-col gap-5 p-4 border border-[#C3CAD1] rounded-[8px]">
          <Image alt="" className="w-full" src={luggageImage} />
          <div>Need more luggage?</div>
          <Button>See options</Button>
        </div>
        <div className="flex flex-col gap-5 p-4 border border-[#C3CAD1] rounded-[8px]">
          <Image alt="" className="w-full" src={upgradeImage} />
          <div>Upgrade to priority?</div>
          <Button>See options</Button>
        </div>
      </div>

      <div className="mt-8">
        <div className="text-[#474849] text-[20px] font-semibold leading-normal">
          Traveller details
        </div>
        <div className="flex flex-col gap-5 mt-4 pt-4 border border-[#C3CAD1] rounded-[8px] p-4">
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-1">
              <Label
                className="text-[#474849] text-[14px] font-medium leading-[140%] tracking-[0.28px]"
                htmlFor="first_name"
              >
                First name
              </Label>
              <Input
                className="bg-[#F2F2F2] border-[#F2F2F2] rounded h-[44px]"
                type="text"
                id="first_name"
                disabled
                value={user.name}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <Label
                className="text-[#474849] text-[14px] font-medium leading-[140%] tracking-[0.28px]"
                htmlFor="last_name"
              >
                Last name
              </Label>
              <Input
                className="bg-[#F2F2F2] border-[#F2F2F2] rounded h-[44px]"
                type="text"
                id="last_name"
                disabled
                value={user.surname}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-1">
              <Label
                className="text-[#474849] text-[14px] font-medium leading-[140%] tracking-[0.28px]"
                htmlFor="email"
              >
                Email
              </Label>
              <Input
                className="bg-[#F2F2F2] border-[#F2F2F2] rounded h-[44px]"
                type="email"
                id="email"
                disabled
                value={user.email}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <Label
                className="text-[#474849] text-[14px] font-medium leading-[140%] tracking-[0.28px]"
                htmlFor="passport"
              >
                Passport
              </Label>
              <Input
                className="bg-[#F2F2F2] border-[#F2F2F2] rounded h-[44px]"
                type="text"
                id="passport"
                onChange={(value) => setPassport(value.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 w-full">
              <Label
                className="text-[#474849] text-[14px] font-medium leading-[140%] tracking-[0.28px]"
                htmlFor="number"
              >
                Mobile number
              </Label>
              <div className="flex gap-3 w-full">
                <Select>
                  <SelectTrigger className="w-[150px]">
                    <div className="flex items-center gap-[10px] justify-between bg-[#F2F2F2] py-[10px] px-3 rounded">
                      <div className="flex items-center gap-[10px]">
                        <Image alt="" src={ausImage} />
                        <div className="text-[#474849] text-[15px] leading-[140%] tracking-[0.3px]">
                          +61
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <path
                          d="M7.58745 8.36803C7.1979 8.75758 7.1979 9.38916 7.58745 9.77871L12.5407 14.732C12.5407 14.732 12.5407 14.732 12.5407 14.732C12.9303 15.1215 13.5619 15.1216 13.9514 14.732L18.9047 9.77872C19.2943 9.38917 19.2943 8.75759 18.9047 8.36804C18.5152 7.97849 17.8836 7.97849 17.494 8.36804L13.2461 12.616L8.99813 8.36803C8.60858 7.97848 7.977 7.97848 7.58745 8.36803Z"
                          fill="#474849"
                        />
                      </svg>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aus">
                      <div className="flex">
                        <Image alt="" src={ausImage} />
                        <div>+61</div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  className="flex-1 bg-[#F2F2F2] border-[#F2F2F2] rounded h-[44px]"
                  type="text"
                  id="number"
                  onChange={(value) => setMobileNumber(value.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Checkbox />
            <div className="text-[#474849] text-[14px] leading-normal tracking-[0.28px]">
              Receive text alerts about this trip.
            </div>
          </div>
        </div>
        <Button
          className="mt-6 w-full"
          disabled={!isSubmitEnabled}
          onClick={onClickSubmit}
        >
          Book flight
        </Button>
      </div>
    </div>
  );
};

export default FlightForm;
