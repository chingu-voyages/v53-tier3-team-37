export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  nutrients: Nutrient[];
}

export interface Nutrient {
    name: string;
    amount: number;
    unit: string;
    percentOfDailyNeeds: number;
}

export interface Property {
    name: string;
    amount: number;
    unit: string;

}

export interface Nutrition {
  nutrients: Nutrient[];
  properties: Property[];
  ingredients: Ingredient[];
  caloricBreakdown: CaloricBreakdown;
  weightPerServing: WeightPerServing;
}

export interface CaloricBreakdown {
  percentProtein: number;
  percentFat: number;
  percentCarbs: number;
}

export interface WeightPerServing {
  amount: number;
  unit: string;
}

export interface InstructionStep {
  number: number;
  step: string;
}

export interface AnalyzedInstructions {
  name: string | null;
  steps: InstructionStep[];
}

export interface RecipeResult {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  sourceName: string;
  pricePerServing: number;
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  nutrition: Nutrition;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  analyzedInstructions: AnalyzedInstructions[];
  spoonacularScore: number;
  spoonacularSourceUrl: string;
}

export interface Results {
  results: RecipeResult[];
}