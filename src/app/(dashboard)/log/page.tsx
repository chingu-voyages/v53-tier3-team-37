import FoodSummary from "./components/food-summary";
import MealSection from "./components/meal-section";
import { FoodItem } from "@/types/foodlogtypes";
import AddToLogButton from "./components/add-to-log";

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
    <div className="h-[calc(100vh-4.5rem)] flex flex-col bg-gray-100">
      <header className="p-4 bg-white shadow">
        <h1 className="text-2xl font-bold">Food Log</h1>
      </header>
      <section className="space-y-4 overflow-y-auto flex-1 relative">
        <FoodSummary mealData={dummyMealData} />

        <h2 className="text-4xl font-bold pl-4">Meals</h2>
        <div className="space-y-4 ">
          <MealSection
            mealType="Breakfast"
            items={dummyMealData.breakfast || []}
          />
          <MealSection mealType="Lunch" items={dummyMealData.lunch || []} />
          <MealSection mealType="Dinner" items={dummyMealData.dinner || []} />
        </div>

        <AddToLogButton />
      </section>
    </div>
  );
};

export default FoodLogPage;
