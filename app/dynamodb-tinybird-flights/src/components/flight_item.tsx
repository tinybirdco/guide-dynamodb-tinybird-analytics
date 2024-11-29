import React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

type Props = {
  actions?: React.ReactNode;
  airline: string;
  arrivalAirport: string;
  arrivalTime: string;
  className?: string;
  departureAirport: string;
  departureTime: string;
  duration: string;
  price: number;
};

const FlightItem = ({
  actions,
  airline,
  arrivalAirport,
  arrivalTime,
  className,
  departureAirport,
  departureTime,
  duration,
  price,
}: Props) => {
  return (
    <div className={cn("flex border border-[#C3CAD1 rounded-[6px]", className)}>
      <div className="flex-1 flex items-center justify-between py-4 pl-6 pr-14">
        <div className="text-[#8A9095] text-[12px] leading-normal font-semibold">
          {airline}
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col gap-1">
            <div className="text-[#5E6369] text-[24px] font-semibold leading-[30px]">
              {departureTime}
            </div>
            <div className="text-[#8A9095] text-[12px] font-semibold leading-normal">
              {departureAirport}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-2 w-[96px]">
              <div className="text-[#95999F] text-[12px] font-semibold leading-normal">
                {duration}
              </div>
              <Separator />
              <div className="text-[#72A3E3] text-[12px] font-semibold leading-normal">
                Direct
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <g clipPath="url(#clip0_25_3514)">
                <path
                  d="M15.0883 8.49846C15.0883 8.99036 14.6428 9.38638 14.0941 9.38221L10.4455 9.38221L7.12991 14.0969L5.80273 14.1011L7.46756 9.38638H3.80962L2.8201 10.5661L1.82119 10.5619L2.48713 8.50263L1.8212 6.43501L2.82479 6.42667L3.82369 7.62306L7.4535 7.62306L5.80273 2.89586L7.12991 2.90003L10.4455 7.61472H14.0941C14.6287 7.60638 15.0977 8.02324 15.0883 8.49846Z"
                  fill="#56667B"
                />
              </g>
              <defs>
                <clipPath id="clip0_25_3514">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0.5 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[#5E6369] text-[24px] font-semibold leading-[30px]">
              {arrivalTime}
            </div>
            <div className="text-[#8A9095] text-[12px] font-semibold leading-normal">
              {arrivalAirport}
            </div>
          </div>
        </div>
      </div>
      {actions || (
        <div className="w-[168px] flex items-center justify-center text-white text-[24px] font-semibold leading-normal bg-[#8D8F91] rounded-r-[6px] group-hover:bg-[#2F80ED]">
          {price}€
        </div>
      )}
    </div>
  );
};

export default FlightItem;
