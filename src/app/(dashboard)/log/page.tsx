import FoodSummary from "./components/food-summary";
import MealSection from "./components/meal-section";
import { FoodItem } from "@/types/foodlogtypes";

const dummyMealData: Record<string, FoodItem[]> = {
  breakfast: [
    {
      id: 1,
      image: "/oatmeal.webp",
      name: "Oatmeal",
      calories: 150,
      protein: 5,
      carbs: 27,
      fat: 3,
    },

    {
      id: 2,
      image: "/banana.jpg",
      name: "Banana",
      calories: 100,
      protein: 1,
      carbs: 23,
      fat: 0.3,
    },
  ],

  lunch: [
    {
      id: 3,
      image: "/grilled-chicken-salad.jpg",
      name: "Chicken Salad",
      calories: 350,
      protein: 30,
      carbs: 10,
      fat: 20,
    },
  ],
  dinner: [
    {
      id: 4,
      image: "/grilled-salmon-recipe-2.jpg",
      name: "Grilled Salmon",
      calories: 400,
      protein: 35,
      carbs: 5,
      fat: 25,
    },
  ],
};

const FoodLogPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-white shadow">
        <h1 className="text-2xl font-bold">Food Log</h1>
      </header>
      <main className="space-y-4">
        {/* Summary section containing overall nutrition data */}
        {/* <FoodSummary mealData={dummyMealData} /> */}

        {/* Meal sections for the day */}
        <div className="space-y-4">
          <MealSection
            mealType="Breakfast"
            items={dummyMealData.breakfast || []}
          />
          <MealSection mealType="Lunch" items={dummyMealData.lunch || []} />
          <MealSection mealType="Dinner" items={dummyMealData.dinner || []} />
        </div>
      </main>
    </div>
  );
};

export default FoodLogPage;
