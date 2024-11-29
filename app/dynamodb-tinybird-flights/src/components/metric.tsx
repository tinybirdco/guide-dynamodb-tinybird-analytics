import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Metric({
  title,
  description,
  metric,
}: {
  metric: string;
  title: string;
  description: string;
}) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <span>{metric}</span>
      </CardContent>
    </Card>
  );
}
