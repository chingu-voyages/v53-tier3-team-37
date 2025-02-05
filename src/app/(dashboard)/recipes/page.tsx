'use client';
import sampleRecipes from '../../../data/sampleRecipes.json';
import sampleSearchResults from '../../../data/sampleSearchResults.json';
import { useState } from "react";
import { Recipe, Ingredient } from './definitions/definitions';

export default function RecipePage() {
  const [recipeIndex, setRecipeIndex] = useState(0);
  const recipe = sampleSearchResults[recipeIndex];

  const nextRecipe = () => {
    setRecipeIndex((prev) => (prev + 1) % sampleRecipes.length);
  };

  const prevRecipe = () => {
    setRecipeIndex((prev) => (prev - 1 + sampleRecipes.length) % sampleRecipes.length);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 h-full">
      {recipeIndex > 0 && (
        <button
          onClick={prevRecipe}
          className="absolute left-0 top-0 h-[calc(100%-90px)] mt-2 w-16 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-40 transition-opacity rounded-r-lg"
        >
          <span className="text-white text-3xl">‹</span>
        </button>
      )}

      <div className="bg-white/60 backdrop-blur-lg p-5 rounded-2xl shadow-lg shadow-gray-400/30 w-80 flex-1 overflow-auto m-2">
        <h2 className="text-2xl font-bold text-center text-gray-900">{recipe.title}</h2>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-40 object-cover rounded-2xl mt-2 shadow-md mx-auto"
        />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col items-center bg-white/50 backdrop-blur-md p-4 rounded-md shadow-md">
            <p className="text-sm font-medium text-gray-600">Calories</p>
            <p className="text-2xl font-bold text-gray-900">
              {sampleSearchResults[recipeIndex].calories}
              <span className="text-xs text-gray-600">kcal</span>
            </p>
          </div>
          <div className="flex flex-col items-center bg-white/50 backdrop-blur-md p-4 rounded-md shadow-md">
            <p className="text-sm font-medium text-gray-600">Carbs</p>
            <p className="text-2xl font-bold text-gray-900">
              {sampleSearchResults[recipeIndex].carbs}
              <span className="text-xs text-gray-600">g</span>
            </p>
          </div>
          <div className="flex flex-col items-center bg-white/50 backdrop-blur-md p-4 rounded-md shadow-md">
            <p className="text-sm font-medium text-gray-600">Fat</p>
            <p className="text-2xl font-bold text-gray-900">
              {sampleSearchResults[recipeIndex].fat}
              <span className="text-xs text-gray-600">g</span>
            </p>
          </div>
          <div className="flex flex-col items-center bg-white/50 backdrop-blur-md p-4 rounded-md shadow-md">
            <p className="text-sm font-medium text-gray-600">Protein</p>
            <p className="text-2xl font-bold text-gray-900">
              {sampleSearchResults[recipeIndex].protein}
              <span className="text-xs text-gray-600">g</span>
            </p>
          </div>
        </div>

        {/* <p className="mt-2">
          Difficulty: <span className="text-green-600 font-bold">{recipe.difficulty}</span>
        </p> */}

        <button className="mt-6 px-5 py-3 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-md transition-all hover:scale-105 hover:shadow-lg">
          Let’s Cook!
        </button>
      </div>

      {recipeIndex < sampleSearchResults.length - 1 && (
        <button
          onClick={nextRecipe}
          className="absolute right-0 top-0 h-[calc(100%-90px)] mt-2 w-16 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-40 transition-opacity rounded-l-lg"
        >
          <span className="text-white text-3xl">›</span>
        </button>
      )}

    </div>
  );
}