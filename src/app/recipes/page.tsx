'use client';
import sampleRecipes from '../../data/sampleRecipes.json'
import { useState } from "react";
import { Recipe, Ingredient } from './definitions/definitions';

export default function RecipePage() {
  const [recipeIndex, setRecipeIndex] = useState(0);
  const recipe = sampleRecipes[recipeIndex];

  const nextRecipe = () => {
    setRecipeIndex((prev) => (prev + 1) % sampleRecipes.length);
  };

  const prevRecipe = () => {
    setRecipeIndex((prev) => (prev - 1 + sampleRecipes.length) % sampleRecipes.length);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-lg font-bold">ReciPlease</h1>

      <div className="bg-yellow-200 p-4 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold text-center">{recipe.title}</h2>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-40 object-cover rounded-md mt-2"
        />

        <div className="mt-4">
          <h3 className="font-bold">Ingredients Needed:</h3>
          {/* <ul className="list-disc ml-4">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.name}</li>
            ))}
          </ul> */}
        </div>

        <div className="mt-4">
          <h3 className="font-bold">Nutrition:</h3>
          {/* <ul className="list-disc ml-4">
            <li>Calories: {recipe.nutrition.calories}</li>
            <li>Protein: {recipe.nutrition.protein}</li>
            <li>Carbs: {recipe.nutrition.carbs}</li>
          </ul> */}
        </div>

        <div className="mt-4 flex justify-between text-sm">
          {/* <p>Prep Time: {recipe.prepTime} mins</p>
          <p>Cook Time: {recipe.cookTime} mins</p> */}
        </div>

        {/* <p className="mt-2">
          Difficulty: <span className="text-green-600 font-bold">{recipe.difficulty}</span>
        </p> */}

        <button className="bg-green-400 text-white font-bold py-2 px-4 rounded-lg mt-4 w-full">
          Let’s Cook!
        </button>
      </div>

      <div className="flex gap-4 mt-4">
        <button onClick={prevRecipe} className="bg-gray-700 text-white p-2 rounded-md">
          ◀
        </button>
        <button onClick={nextRecipe} className="bg-gray-700 text-white p-2 rounded-md">
          ▶
        </button>
      </div>
    </div>
  );
}