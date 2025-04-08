"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";


export function DashLineChart() {
  const [chartData, setChartData] = useState([{ month: "", visitors: 0 }]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    getChartData();
  }, [])

  const getChartData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getVisitorsData`)

      setChartData(response.data);
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Card className="shadow-lg border rounded-lg min-h-[200px] h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Area Chart - Visitors</CardTitle>
        <CardDescription className="text-muted-foreground">
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer className={`w-full min-h-[200px] h-full`}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Tooltip />
            <Area
              dataKey="visitors"
              type="monotone"
              fill="#cb0c9f"
              fillOpacity={0.3}
              stroke="#cb0c9f"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by <span className="text-green-600 font-semibold">5.2%</span> this month
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              <h1>{chartData[0]!=null?chartData[0].month:""}  -  {chartData[4]!=null?chartData[4].month:""}</h1>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
