'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RecipeResult, Ingredient } from '../../app/(dashboard)/recipes/definitions/definitions';
import { X } from "lucide-react";

interface RecipeDetailsProps {
  recipe: RecipeResult;
  onClose: () => void;
}

const RecipeDetails:React.FC<RecipeDetailsProps> = ({ recipe, onClose }) => {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());

  const toggleIngredient = (ingredient: string) => {
    setCheckedIngredients((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(ingredient)) {
        newSet.delete(ingredient);
      } else {
        newSet.add(ingredient);
      }
      return newSet;
    });
  };

  const addToDailyTracker = (calories: number, protein: number) => {
    // Get the current stored values
    const storedCalories = Number(localStorage.getItem("dailyCalories")) || 0;
    const storedProtein = Number(localStorage.getItem("dailyProtein")) || 0;
  
    // Update values
    const newCalories = storedCalories + calories;
    const newProtein = storedProtein + protein;
  
    // Save back to localStorage
    localStorage.setItem("dailyCalories", newCalories.toString());
    localStorage.setItem("dailyProtein", newProtein.toString());
  };

  return (

      <div>
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-semibold text-gray-800 text-center mt-4">{recipe.title}</h2>

        
        <div className="flex-1 overflow-y-auto px-2">
          <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
          <ul className="max-h-48 overflow-y-auto pr-2">
            {recipe.nutrition.ingredients.map((ingredient, index) => (
              <li key={ingredient.name} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                <span
                  className={`text-gray-800 transition-all ${checkedIngredients.has(ingredient.name) ? "line-through opacity-50" : ""}`}>{ingredient.name} ({ingredient.amount*(recipe.servings)} {ingredient.unit})</span>
                <input
                  type="checkbox"
                  checked={checkedIngredients.has(ingredient.name)}
                  onChange={() => toggleIngredient(ingredient.name)}
                  className="w-5 h-5"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mt-6 mb-4">Steps</h3>
          <ol className="mt-2 space-y-3 list-decimal list-inside bg-gray-100 pr-2 rounded-md max-h-64 overflow-y-auto">
            {recipe.analyzedInstructions[0].steps.map((step) => (
              <li key={step.number} className="text-gray-700">{step.step}</li>
            ))}
          </ol>
        </div>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => addToDailyTracker(recipe.nutrition.nutrients[0].amount, recipe.nutrition.nutrients[10].amount)}
        >
          Add to Daily Tracker
        </button>
      </div>
  );
};

export default RecipeDetails;