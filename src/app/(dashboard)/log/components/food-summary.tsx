import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FoodItem } from "@/types/foodlogtypes";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { CurrCalories } from "./curr-calories";

const mockMacroData = [
  { name: "Protein", value: 90 },
  { name: "Carbs", value: 150 },
  { name: "Fat", value: 60 },
];

const FoodSummary = ({
  mealData,
}: {
  mealData: Record<string, FoodItem[]>;
}) => {
  // Sum calories from dummy food items as an example.
  const totalCalories =
    mealData.breakfast.reduce((acc, item) => acc + item.calories, 0) +
    mealData.lunch.reduce((acc, item) => acc + item.calories, 0) +
    mealData.dinner.reduce((acc, item) => acc + item.calories, 0);

  // Example water intake in ml. You might later calculate this from tracked data.
  const totalWater = 2000;

  return (
    <div className="space-y-4 p-4">
      <CurrCalories totalCalories={totalCalories} />
    </div>
  );
};

export default FoodSummary;
