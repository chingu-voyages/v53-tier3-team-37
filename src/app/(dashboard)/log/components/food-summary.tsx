import { FoodItem } from "@/types/foodlogtypes";
import { CurrCalories } from "./curr-calories";
import { InfoCardChart } from "./info-card-chart";

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
  const totalProtein = 100;
  const totalCarbs = 200;
  const totalFat = 30;

  return (
    <div className="space-y-4 ">
      <CurrCalories totalCalories={totalCalories} />

      <h2 className="text-4xl font-bold">Today&apos;s Total Macros</h2>
      <div className="grid grid-cols-2 gap-4">
        <InfoCardChart
          title="Calories"
          data={totalCalories}
          unit="cal"
          color="red"
        />
        <InfoCardChart
          title="Protein"
          data={totalProtein}
          unit="g"
          color="green"
        />

        <InfoCardChart
          title="Carbs"
          data={totalCarbs}
          unit="g"
          color="purple"
        />

        <InfoCardChart title="Fat" data={totalFat} unit="g" color="yellow" />

        <InfoCardChart title="Water" data={totalWater} unit="ml" color="blue" />
      </div>
    </div>
  );
};

export default FoodSummary;
