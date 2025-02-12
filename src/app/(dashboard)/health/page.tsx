'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ProgressRing from "@/components/health/ProgressRing";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HealthTracker() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [inputCalories, setInputCalories] = useState(0);
  const [inputProtein, setInputProtein] = useState(0);

  const calorieGoal = 3000;
  const proteinGoal = 150;

  // Load existing data from localStorage (for persistence)
  useEffect(() => {
    const storedCalories = localStorage.getItem("dailyCalories");
    const storedProtein = localStorage.getItem("dailyProtein");

    if (storedCalories) setCalories(Number(storedCalories));
    if (storedProtein) setProtein(Number(storedProtein));
  }, []);

  // Save to localStorage when state updates
  useEffect(() => {
    localStorage.setItem("dailyCalories", calories.toString());
    localStorage.setItem("dailyProtein", protein.toString());
  }, [calories, protein]);

  const handleAddCalories = () => {
    setCalories((prev) => prev + Number(inputCalories));
    setInputCalories(0);
  };

  const handleAddProtein = () => {
    setProtein((prev) => prev + Number(inputProtein));
    setInputProtein(0);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg h-full">
      <h2 className="text-xl font-semibold">Daily Health Tracker</h2>
      <p className="text-gray-600">Track your daily caloric & protein intake.</p>

      <div className="flex flex-row justify-between w-full max-w-[90vw] space-x-4">
        <div className="flex flex-col items-center justify-center w-2/5 min-w-[170px] max-w-[200px]">
          <ProgressRing value={calories} goal={calorieGoal} color="#facc15" />
          <p className="text-lg font-medium mt-2">
            Calories: {calories} / {calorieGoal}
          </p>
          <div className="flex items-center space-x-2">
          <Input
            type="number"
            placeholder="Enter Calories"
            value={inputCalories}
            onChange={(e) => setInputCalories(Number(e.target.value))}
            className="w-24 text-center"
          />
          <Button
            onClick={() => handleAddCalories()}
            className="bg-yellow-400 hover:bg-yellow-500"
          >
            Add
          </Button>
        </div>
        </div>

        <div className="flex flex-col items-center justify-center w-2/5 min-w-[170px] max-w-[200px]">
          <ProgressRing value={protein} goal={proteinGoal} color="#34d399" />
          <p className="text-lg font-medium mt-2">
            Protein: {protein}g / {proteinGoal}g
          </p>
          <div className="flex items-center space-x-2">
          <Input
            type="number"
            placeholder="Enter Protein"
            value={inputProtein}
            onChange={(e) => setInputProtein(Number(e.target.value))}
            className="w-24 text-center"
          />
          <Button
            onClick={() => handleAddProtein()}
            className="bg-green-400 hover:bg-green-500"
          >
            Add
          </Button>
        </div>
        </div>
      </div>

      
    </div>
  );
}
