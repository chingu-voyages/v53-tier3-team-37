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

      <div className="bg-yellow-200 p-5 rounded-lg shadow-lg w-80 flex-1 overflow-auto m-2">
        <h2 className="text-lg font-bold text-center">{recipe.title}</h2>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-40 object-cover rounded-md mt-2"
        />

<div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-md shadow-md">
            <p className="text-sm font-semibold">Calories</p>
            <p className="text-2xl font-bold">
              {sampleSearchResults[recipeIndex].calories}
              <span className="text-xs ml-1">kcal</span>
            </p>
          </div>
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-md shadow-md">
            <p className="text-sm font-semibold">Carbs</p>
            <p className="text-2xl font-bold">
              {sampleSearchResults[recipeIndex].carbs}
              <span className="text-xs ml-1">g</span>
            </p>
          </div>
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-md shadow-md">
            <p className="text-sm font-semibold">Fat</p>
            <p className="text-2xl font-bold">
              {sampleSearchResults[recipeIndex].fat}
              <span className="text-xs ml-1">g</span>
            </p>
          </div>
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-md shadow-md">
            <p className="text-sm font-semibold">Protein</p>
            <p className="text-2xl font-bold">
              {sampleSearchResults[recipeIndex].protein}
              <span className="text-xs ml-1">g</span>
            </p>
          </div>
        </div>

        {/* <p className="mt-2">
          Difficulty: <span className="text-green-600 font-bold">{recipe.difficulty}</span>
        </p> */}

        <button className="bg-green-400 text-white font-bold py-2 px-4 rounded-lg mt-4 w-full">
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