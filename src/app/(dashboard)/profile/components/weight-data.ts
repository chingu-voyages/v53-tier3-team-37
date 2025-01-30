import { ChartConfig } from "@/components/ui/chart";

export const today = new Date().toISOString().split("T")[0];

export const timeRanges = {
  week: "Past Week",
  month: "Past Month",
  quarter: "Past 3 Months",
  year: "Past Year",
  all: "All Time",
} as const;

export const chartData = [
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

export const chartConfig = {
  weight: {
    label: "Total Weight lost (lbs)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
