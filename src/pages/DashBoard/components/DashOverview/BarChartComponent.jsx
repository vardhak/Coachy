"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
    { day: "Monday", attendance: 42 },
    { day: "Tuesday", attendance: 38 },
    { day: "Wednesday", attendance: 45 },
    { day: "Thursday", attendance: 50 },
    { day: "Friday", attendance: 47 },
    { day: "Saturday", attendance: 30 },
  ];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#cb0c9f",
  },
}; // Removed `satisfies ChartConfig`

export function BarChartComponent() {
  return (
    <Card className={`min-h-[200px] h-full shadow-lg flex flex-col justify-center`}>
      <CardHeader>
        <CardTitle>Students Daily Attendance</CardTitle>
        <CardDescription>mon - sat</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}  >
          <BarChart
            data={chartData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="attendance" fill="var(--color-desktop)" radius={8}>
              <LabelList
                dataKey="attendance"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
