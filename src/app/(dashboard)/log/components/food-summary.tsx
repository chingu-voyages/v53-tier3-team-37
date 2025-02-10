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
      <Card>
        <CardHeader>
          <CardTitle>Total Calories Consumed</CardTitle>
          <CardDescription>{totalCalories} kcal</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Water Intake</CardTitle>
            <CardDescription>{totalWater / 1000} L</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={[
                { time: "Morning", value: 500 },
                { time: "Afternoon", value: 700 },
                { time: "Evening", value: 800 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#00aaff"
                strokeWidth={2}
              />
            </LineChart>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Macros Breakdown</CardTitle>
            <CardDescription>Today&#39;s macronutrients</CardDescription>
          </CardHeader>
          <CardContent>
            \{" "}
            <LineChart data={mockMacroData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="value" stroke="#ff5555" strokeWidth={2} />
            </LineChart>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FoodSummary;
