"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  consumed: {
    label: "Consumed",
    color: "hsl(var(--chart-1))",
  },
  remaining: {
    label: "Remaining",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CurrCalories({ totalCalories }: { totalCalories: number }) {
  const chartData = [
    { today: "today", consumed: totalCalories, remaining: 700 },
  ];

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square w-full max-w-[250px]"
    >
      <RadialBarChart
        data={chartData}
        endAngle={180}
        innerRadius={100}
        outerRadius={160}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                      className="fill-foreground text-4xl font-bold"
                    >
                      {totalCalories.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 4}
                      className="fill-muted-foreground text-xl"
                    >
                      kcal
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
        <RadialBar
          dataKey="consumed"
          stackId="a"
          cornerRadius={5}
          fill="var(--color-consumed)"
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="remaining"
          fill="var(--color-remaining)"
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2"
        />
      </RadialBarChart>
    </ChartContainer>
  );
}
