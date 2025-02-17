"use client";
import { useCallback, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
// import { useSession } from "next-auth/react";
// import sampleFullReturn from "../../../../data/sampleFullReturn.json";
import { RecipeResult } from "../definitions/definitions";
import RecipeCard from "@/components/recipe/RecipeCard";
import { RecipeSearchParams, recipeSearchSchema } from "@/schemas/recipeSearch";

export default function ResultsPage() {
  const [data, setData] = useState<null>(null);
  const [recipeIndex, setRecipeIndex] = useState<number>(0);

  // Use the hook to get the search params from the URL.
  const searchParams = useSearchParams();
  // const session = useSession();
  // console.log("session looks like: ", session);

  // Wrap the function in useCallback so that it uses the dependency array correctly.
  const parseSearchParams = useCallback(() => {
    const params: Record<string, string | number> = {};

    // Iterate over the URLSearchParams
    searchParams.forEach((value, key) => {
      params[key] = value;
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
      try {
        const searchParamsObj = new URLSearchParams();

        if (params) {
          if (params.search && params.search.trim() !== "") {
            searchParamsObj.set("search", params.search.trim());
          }

          // handle include ingredients array
          if (
            params.includeIngredients &&
            Array.isArray(params.includeIngredients) &&
            params.includeIngredients.length > 0
          ) {
            params.includeIngredients.forEach((ingredient) => {
              const trimmed = ingredient.trim();
              if (trimmed !== "") {
                searchParamsObj.append("includeIngredients", trimmed);
              }
            });
          }
        }
        const queryString = searchParamsObj.toString();
        console.log("String:", queryString);
        const apiUrl = queryString
          ? `/api/recipe/?${queryString}`
          : `/api/recipe/`;
        console.log("Fetching recipes from:", apiUrl);
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const jsonData = await response.json();
          console.log(jsonData);
          setData(jsonData.results);
          setRecipeIndex(0);
        } else {
          console.error(
            "Failed to fetch the recipes, status:",
            response.status
          );
        }
      } catch (err) {
        alert(`Error fetching Recipes: ${err}`);
      }
    };

    fetchRecipes(validatedParams);
  }, [validatedParams]);

  if (!data) {
    return <p>Loading recipes...</p>;
  }

  const recipes: RecipeResult[] = data || [];
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
      {data !== null && (
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
