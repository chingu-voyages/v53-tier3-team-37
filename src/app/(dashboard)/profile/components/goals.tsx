"use client";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  ReferenceLine,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo, useState } from "react";

const Goals = () => {
  return (
    <section className="p-4 ">
      <h2 className="text-2xl font-bold">Goals</h2>
      <GoalsChart />
    </section>
  );
};

export default Goals;

const startDate = "2023-12-31";
const today = new Date().toISOString().split("T")[0];

const chartData = [
  { date: "2024-01-01", weight: 200 },
  { date: "2024-01-08", weight: 198.6 },
  { date: "2024-01-15", weight: 197.2 },
  { date: "2024-01-22", weight: 197.8 }, // Small fluctuation up
  { date: "2024-01-29", weight: 196.4 },
  { date: "2024-02-05", weight: 195.1 },
  { date: "2024-02-12", weight: 195.7 }, // Small fluctuation up
  { date: "2024-02-19", weight: 194.2 },
  { date: "2024-02-26", weight: 193.5 },
  { date: "2024-03-04", weight: 192.8 },
  { date: "2024-03-11", weight: 193.1 }, // Small fluctuation up
  { date: "2024-03-18", weight: 191.9 },
  { date: "2024-03-25", weight: 190.6 },
  { date: "2024-04-01", weight: 189.8 },
  { date: "2024-04-08", weight: 188.5 },
  { date: "2024-04-15", weight: 189.2 }, // Small fluctuation up
  { date: "2024-04-22", weight: 187.7 },
  { date: "2024-04-29", weight: 186.9 },
  { date: "2024-05-06", weight: 185.8 },
  { date: "2024-05-13", weight: 184.9 },
  { date: "2024-05-20", weight: 185.3 }, // Small fluctuation up
  { date: "2024-05-27", weight: 183.8 },
  { date: "2024-06-03", weight: 182.5 },
  { date: "2024-06-10", weight: 181.7 },
  { date: "2024-06-17", weight: 180.9 },
  { date: "2024-06-24", weight: 180.2 },
  { date: "2024-06-30", weight: 179.5 },
  { date: today, weight: 179.5 },
];

const chartConfig = {
  weight: {
    label: "Weight (lbs)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function GoalsChart() {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("weight");

  const totalWeightLost = useMemo(
    () => ({
      weight: chartData[0].weight - chartData[chartData.length - 1].weight,
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Weight Loss Progress</CardTitle>
          <CardDescription>
            Showing total weight for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["weight"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {totalWeightLost.weight.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20, // Add top margin for padding above reference line
              right: 30, // Increased for Y-axis labels
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              domain={[170, 210]} // Set domain to create padding above/below data
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{
                value: "Weight (lbs)",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
                offset: 5,
              }}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ReferenceLine
              y={200} // Replace this with your starting weight value
              stroke="hsl(var(--chart-3))"
              strokeDasharray="3 3"
              label={{
                value: "Starting Weight",
                position: "right",
                fill: "hsl(var(--chart-3))",
                fontSize: 12,
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
