export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  readyInMinutes: number;
  servings: number;
  image: string;
  summary: string;
  healthScore: number;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  ingredients: Ingredient[];
  instructions: string[];
}

export interface searchResult {
  id: number;
  title: string;
  image: string;
  calories: number;
  carbs: string;
  fat: string;
  protein: string;
}