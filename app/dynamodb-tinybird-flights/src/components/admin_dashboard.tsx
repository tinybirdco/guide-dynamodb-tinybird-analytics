"use client";

import { User } from "@/lib/users";
import { FlightCostOverTime } from "@/components/tinybird/flight_cost_over_time";
import { Metric } from "@/components/metric";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ChartTopTravellers } from "./tinybird/top_travellers";

const token = process.env.NEXT_PUBLIC_TINYBIRD_DASHBOARD_READ_TOKEN;

export default function AdminDashboard({ user }: { user: User }) {
  const [totalFlights, setTotalFlights] = useState(0);
  const [flightCost, setFlightCost] = useState(0);
  const [uniqueTravellers, setUniqueTravellers] = useState(0);
  const company = user.company;

  async function getTotalFlights() {
    let url = new URL(
      `https://api.eu-central-1.aws.tinybird.co/v0/pipes/api_flights_taken.json`
    );

    url.searchParams.append("company", company);

    const result = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((r) => r)
      .catch((e) => e.toString());

    if (!result.data) {
      console.error(`there is a problem running the query: ${result}`);
    } else {
      setTotalFlights(result.data[0].total);
    }
  }

  async function getFlightCost() {
    let url = new URL(
      `https://api.eu-central-1.aws.tinybird.co/v0/pipes/api_flight_cost.json`
    );

    url.searchParams.append("company", company);

    const result = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((r) => r)
      .catch((e) => e.toString());

    if (!result.data) {
      console.error(`there is a problem running the query: ${result}`);
    } else {
      setFlightCost(result.data[0].total);
    }
  }

  async function getUniqueTravellers() {
    let url = new URL(
      `https://api.eu-central-1.aws.tinybird.co/v0/pipes/api_unique_travellers.json`
    );

    url.searchParams.append("company", company);

    const result = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((r) => r)
      .catch((e) => e.toString());

    if (!result.data) {
      console.error(`there is a problem running the query: ${result}`);
    } else {
      setUniqueTravellers(result.data[0].total);
    }
  }

  useEffect(() => {
    getTotalFlights();
    getFlightCost();
    getUniqueTravellers();
  }, []);

  return (
    <>
      <div className="text-[#474849] text-[20px] font-semibold leading-normal mb-7">{`Let's see how ${company} been travelling`}</div>
      <div className="flex gap-3 mb-4">
        <Metric
          title="Total flights"
          metric={totalFlights.toString()}
          description=""
        />
        <Metric
          title="Total flight cost"
          metric={flightCost.toString()}
          description=""
        />
        <Metric
          title="Unique travellers"
          metric={uniqueTravellers.toString()}
          description=""
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <FlightCostOverTime company={company} />
        </Card>
        <Card className="p-4">
          <ChartTopTravellers company={company} />
        </Card>
      </div>
    </>
  );
}
