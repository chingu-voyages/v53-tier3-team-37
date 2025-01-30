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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo, useState } from "react";
import { chartConfig, chartData } from "./weight-data";

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
                position: "top",
                fill: "hsl(var(--chart-3))",
                fontSize: 14,
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
