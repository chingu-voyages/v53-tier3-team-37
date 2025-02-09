

import { useSearchParams } from 'next/navigation';
import sampleFullReturn from '../../../../data/sampleFullReturn.json';

import { RecipeResult } from '../definitions/definitions';

import RecipeCard from '@/components/recipe/RecipeCard';
import { recipeSearchSchema } from '@/schemas/recipeSearch';

export default function ResultsPage() {
  const recipe:RecipeResult = sampleFullReturn.results[0];

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

  return (
    <div className="flex justify-center items-center h-full w-full px-4 sm:px-6 ">      
        <RecipeCard key={recipe.id} recipe={recipe} />
    </div>
  );
  
}
