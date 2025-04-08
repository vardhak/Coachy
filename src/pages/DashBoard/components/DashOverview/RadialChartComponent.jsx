"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    { browser: "Chrome", visitors: 275, fill: "#FF5733" }, // Red-Orange
    { browser: "Safari", visitors: 200, fill: "#33FF57" }, // Green
    { browser: "Firefox", visitors: 187, fill: "#3357FF" }, // Blue
    { browser: "Edge", visitors: 173, fill: "#FFC300" }, // Yellow
    { browser: "Other", visitors: 90, fill: "#A833FF" }, // Purple
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "#FF5733",
    },
    safari: {
      label: "Safari",
      color: "#33FF57",
    },
    firefox: {
      label: "Firefox",
      color: "#3357FF",
    },
    edge: {
      label: "Edge",
      color: "#FFC300",
    },
    other: {
      label: "Other",
      color: "#A833FF",
    },
  } 

export function RadialChartComponent() {
  return (
    <Card className="flex flex-col shadow-lg">
      {/* <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Browser Visitors</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader> */}
      <CardContent className="flex-1 pb-0">
        <ChartContainer className="mx-auto w-full min-h-[200px]" config={chartConfig}>
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />
            <RadialBar dataKey="visitors" background>
              <LabelList
                position="insideStart"
                dataKey="browser"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
