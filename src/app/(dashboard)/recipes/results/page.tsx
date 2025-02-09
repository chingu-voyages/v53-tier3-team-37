

import sampleFullReturn from '../../../../data/sampleFullReturn.json';

import { RecipeResult } from '../definitions/definitions';

import RecipeCard from '@/components/recipe/RecipeCard';

export default function ResultsPage() {
  const recipe:RecipeResult = sampleFullReturn.results[0];

  return (
    <div className="flex justify-center items-center h-full w-full px-4 sm:px-6 ">      
        <RecipeCard key={recipe.id} recipe={recipe} />
    </div>
  );
  
}