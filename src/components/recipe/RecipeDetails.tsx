'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RecipeResult, Ingredient } from '../../app/(dashboard)/recipes/definitions/definitions';
import { cn } from '@/lib/utils';

interface RecipeDetailsProps {
  recipe: RecipeResult;
  onClose: Function;
}

const RecipeDetails:React.FC<RecipeDetailsProps> = ({ recipe, onClose }) => {
  const router = useRouter();
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  const [yOffset, setYOffset] = useState(0);

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

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 15 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 overflow-hidden">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-semibold text-gray-800 text-center">{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover mt-4 rounded-md" />
        
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">Ingredients</h3>
          <ul className="mt-2 space-y-2">
            {recipe.nutrition.ingredients.map(({ name, amount }) => (
              <li key={name} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                <span>{name} ({amount*(recipe.servings)})</span>
                <input
                  type="checkbox"
                  checked={checkedIngredients.has(name)}
                  onChange={() => toggleIngredient(name)}
                  className="w-5 h-5"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">Steps</h3>
          <ol className="mt-2 space-y-3 list-decimal list-inside bg-gray-100 p-4 rounded-md">
            {recipe.analyzedInstructions[0].steps.map((step) => (
              <li key={step.number} className="text-gray-700">{step.step}</li>
            ))}
          </ol>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeDetails;