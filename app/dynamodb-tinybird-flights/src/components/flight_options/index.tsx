import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import mealImage from "./assets/meal.png";
import luggageImage from "./assets/luggage.png";
import upgradeImage from "./assets/upgrade.png";

type Props = {
  className?: string;
};

const FlightOptions = ({ className }: Props) => {
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
    </div>
  );
};

export default FlightOptions;
