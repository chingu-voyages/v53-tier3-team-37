"use client";

import { useSearchParams } from 'next/navigation';
import sampleFullReturn from '../../../../data/sampleFullReturn.json';
import { RecipeResult } from '../definitions/definitions';
import RecipeCard from '@/components/recipe/RecipeCard';
import { recipeSearchSchema } from '@/schemas/recipeSearch';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const data = sampleFullReturn

export default function ResultsPage() {
  const [data, setData] = useState<RecipeData | null>(null);
  const [recipeIndex, setRecipeIndex] = useState<number>(0);
  const searchParams = useSearchParams();

  const session = useSession();
  console.log("session looks like: ", session);
 

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
  }, [searchParams]);

  // Memoize validated params to avoid unnecessary re-computation.
  const validatedParams = useMemo(
    () => parseSearchParams(),
    [parseSearchParams]
  );

  useEffect(() => {
    const fetchRecipes = async (params: RecipeSearchParams | null) => {
      if (!params) return;

      try {
        // Filter out empty search fields for "search" and "includeIngredients".
        const filteredParams = Object.entries(params).reduce<
          Record<string, string>
        >((acc, [key, value]) => {
          const stringValue = String(value).trim();
          if (
            (key === "search" || key === "includeIngredients") &&
            stringValue === ""
          ) {
            return acc;
          }
          acc[key] = stringValue;
          return acc;
        }, {});

        // Build the query string from the filtered parameters.
        const queryString = new URLSearchParams(filteredParams).toString();
        // If no query parameters, just use the base URL.
        const apiUrl = queryString
          ? `/api/recipe/?${queryString}`
          : `/api/recipe/`;
        console.log("Fetching recipes from:", apiUrl);

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const jsonData: RecipeData = await response.json();
          setData(jsonData);
          // Reset the recipe index when new data is loaded.
          setRecipeIndex(0);
        } else {
          console.error("Failed to fetch recipes, status:", response.status);
        }
      } catch (err) {
        alert(`Error fetching recipe data: ${err}`);
      }
    };

    fetchRecipes(validatedParams);
  }, [validatedParams]);

  if (!data) {
    return <p>Loading recipes...</p>;
  }

  const recipes: RecipeResult[] = data.results || [];
  if (recipes.length === 0) {
    return <p>No recipes found.</p>;
  }
  const recipe: RecipeResult = recipes[recipeIndex];

  const goToNext = () => {
    setRecipeIndex((prevIndex) =>
      prevIndex < recipes.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const goToPrevious = () => {
    setRecipeIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  return (
    <>
      {recipeIndex > 0 && (
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-0 h-[calc(100%-90px)] mt-2 w-16 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-40 transition-opacity rounded-r-lg">
          <span className="text-white text-3xl">‹</span>
        </button>
      )}
      <div className="flex justify-center items-center h-full w-full px-4 sm:px-6">
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
        />
      </div>
      {recipeIndex < recipes.length - 1 && (
        <button
          onClick={goToNext}
          className="absolute right-0 top-0 h-[calc(100%-90px)] mt-2 w-16 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-40 transition-opacity rounded-l-lg">
          <span className="text-white text-3xl">›</span>
        </button>
      )}
    </>
  );
}
