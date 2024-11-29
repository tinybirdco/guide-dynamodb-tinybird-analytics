"use client";

import Link from "next/link";

export default function FlightSuccess() {
  return (
    <div className="h-screen bg-[#2F80ED] flex justify-center items-center">
      <div className="flex flex-col gap-10 w-full max-w-[788px]">
        <div className="text-white text-[40px] font-bold leading-[48px] text-center">
          Operation successfully completed. Enjoy your trip!
        </div>
        <div className="flex gap-4 justify-center w-full">
          <Link
            className="flex justify-center items-center bg-white h-14 text-[#2F80ED] text-[20px] font-semibold leading-normal rounded-[6px] px-[18px]"
            href="/"
          >
            Book another flight
          </Link>
          <Link
            className="flex justify-center items-center h-14 text-white text-[20px] font-semibold leading-normal border border-white rounded-[6px] px-[18px]"
            href="/user/flights"
          >
            Manage flights
          </Link>
        </div>
      </div>
    </div>
  );
}
