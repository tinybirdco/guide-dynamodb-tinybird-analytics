"use client";

import React, { useMemo, useState } from "react";
import { Flight } from "@/lib/flights";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { SliderRange } from "./ui/slider_range";
import { Skeleton } from "./ui/skeleton";

type Props = {
  className?: string;
  flights: Flight[];
  isLoading: boolean;
};

const FlightsSidebar = ({ className, flights, isLoading }: Props) => {
  const [isScalesOpen, setIsScalesOpen] = useState(true);
  const [isDepartureTimeOpen, setIsDepartureTimeOpen] = useState(true);
  const lessPrice = useMemo(
    () =>
      flights.reduce(
        (carry, item) =>
          carry === 0 ? item.price : Math.min(carry, item.price),
        0
      ),
    [isLoading]
  );

  return (
    <div className={className}>
      <Collapsible
        open={isScalesOpen}
        onOpenChange={() => setIsScalesOpen((current) => !current)}
      >
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between">
            <div className="text-[#434345] text-[20px] font-semibold">
              Scales
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              style={{
                transform: `rotateZ(${isScalesOpen ? "0" : "180"}deg)`,
              }}
            >
              <path
                d="M17.5277 15.632C17.9172 15.2425 17.9172 14.6109 17.5277 14.2214L12.5744 9.26807C12.5744 9.26808 12.5744 9.26807 12.5744 9.26807C12.1848 8.87852 11.5532 8.87851 11.1637 9.26806L6.21041 14.2213C5.82086 14.6109 5.82086 15.2425 6.21041 15.632C6.59995 16.0216 7.23153 16.0216 7.62108 15.632L11.869 11.3841L16.117 15.632C16.5065 16.0216 17.1381 16.0216 17.5277 15.632Z"
                fill="#474849"
              />
            </svg>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-8">
          {!isLoading && (
            <div className="items-top flex space-x-3">
              <Checkbox className="w-[22px] h-[22px]" checked id="check1" />
              <div className="grid gap-2">
                <label
                  htmlFor="check1"
                  className="text-[#67696B] text-[11.6px] font-semibold leading-normal mt-px"
                >
                  Direct
                </label>
                <p className="text-[#8C9299] text-[14.1px] leading-normal font-semibold">
                  from {lessPrice}€
                </p>
              </div>
            </div>
          )}
          {isLoading && (
            <Skeleton className="w-full h-[47.55px] rounded-[6px]" />
          )}
          <Separator className="mb-6 mt-5" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible
        open={isDepartureTimeOpen}
        onOpenChange={() => setIsDepartureTimeOpen((current) => !current)}
      >
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between">
            <div className="text-[#434345] text-[20px] font-semibold">
              Departure Time
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              style={{
                transform: `rotateZ(${isScalesOpen ? "0" : "180"}deg)`,
              }}
            >
              <path
                d="M17.5277 15.632C17.9172 15.2425 17.9172 14.6109 17.5277 14.2214L12.5744 9.26807C12.5744 9.26808 12.5744 9.26807 12.5744 9.26807C12.1848 8.87852 11.5532 8.87851 11.1637 9.26806L6.21041 14.2213C5.82086 14.6109 5.82086 15.2425 6.21041 15.632C6.59995 16.0216 7.23153 16.0216 7.62108 15.632L11.869 11.3841L16.117 15.632C16.5065 16.0216 17.1381 16.0216 17.5277 15.632Z"
                fill="#474849"
              />
            </svg>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-8">
          <div className="flex flex-col pb-5">
            <div className="text-[#575859] text-[15.1px] font-semibold leading-normal">
              Outbound
            </div>
            <div className="text-[#575859] text-[16.2px] font-semibold leading-normal mt-2">
              0:00 - 23:59
            </div>
            <SliderRange
              className="mt-4"
              defaultValue={[0, 48]}
              max={48}
              step={1}
            />
          </div>
          <div className="flex flex-col pb-6">
            <div className="text-[#575859] text-[15.1px] font-semibold leading-normal">
              Return
            </div>
            <div className="text-[#575859] text-[16.2px] font-semibold leading-normal mt-2">
              0:00 - 23:59
            </div>
            <SliderRange
              className="mt-4"
              defaultValue={[0, 48]}
              max={48}
              step={1}
            />
          </div>
          <Separator className="mb-6" />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default FlightsSidebar;
