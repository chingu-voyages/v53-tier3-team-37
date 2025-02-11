'use client'

import { useSearchParams } from 'next/navigation';
import sampleFullReturn from '../../../../data/sampleFullReturn.json';
import { RecipeResult } from '../definitions/definitions';
import RecipeCard from '@/components/recipe/RecipeCard';
import { recipeSearchSchema } from '@/schemas/recipeSearch';
import { useState } from 'react';

const data = sampleFullReturn

export default function ResultsPage() {
  const [recipeIndex, setRecipeIndex] = useState(0);
  const recipes:RecipeResult[] = data.results;
  const recipe:RecipeResult = data.results[recipeIndex];

  const searchParams = useSearchParams();

  const parseSearchParams = () => {
    const params: Record<string, string | number> = {};

    searchParams.forEach((value, key) => {
      if (key.endsWith("Min") || key.endsWith("Max")) {
        const numValue = Number(value);
        if (!isNaN(numValue)) {
          params[key] = numValue;
        }
      } else {
        params[key] = value;
      }
    });

    const result = recipeSearchSchema.safeParse(params);

    if (result.success) {
      return result.data;
    }

    console.error("Search params validation failed:", result.error);
    return null;
  };

  const validatedParams = parseSearchParams();
  console.log("Validated params:", validatedParams);

  const goToNext = () => {
    setRecipeIndex((prevIndex) =>
      prevIndex < data.results.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const goToPrevious = () => {
    setRecipeIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  return (<>
    {recipeIndex > 0 && (
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-0 h-[calc(100%-90px)] mt-2 w-16 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-40 transition-opacity rounded-r-lg"
      >
        <span className="text-white text-3xl">‹</span>
      </button>
    )}
    <div className="flex justify-center items-center h-full w-full px-4 sm:px-6 ">      
        <RecipeCard key={recipe.id} recipe={recipe} />
    </div>
    {recipeIndex < data.results.length - 1 && (
      <button
        onClick={goToNext}
        className="absolute right-0 top-0 h-[calc(100%-90px)] mt-2 w-16 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-40 transition-opacity rounded-l-lg"
      >›</button>
    )}
    </>);
  
}
