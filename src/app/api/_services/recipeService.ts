// import { Nutrition } from "@prisma/client";
// import prisma from "../services/prisma";

import { Sensitivity } from "@prisma/client";

// export const getRecipesByIngredients = async (includeIngredients: string) => {
//   // &includeIngredients=${includeIngredients}
// };

// Mifflin-St Jeor method to calculate BMR

export const getRecipes = async (
  query: string,
  weight: string,
  height: string,
  age: string,
  activityLevel: string,
  gender: string,
  mealsPerDay: string = "3",
  includeIngredients: string,
  excludeIngredients: Sensitivity[]
) => {
  const addBMR = gender === "man" ? 5 : -161;
  const BMR =
    10 * parseFloat(weight) +
    6.25 * parseFloat(height) -
    5 * parseInt(age) +
    addBMR;

  const activityLevelNum = () => {
    switch (activityLevel) {
      case "SEDENTARY":
        return 1.2;
      case "LIGHT":
        return 1.375;
      case "MODERATE":
        return 1.55;
      case "VERY":
        return 1.725;
      case "SUPER":
        return 1.9;
      default:
        throw new Error("Invalid activity level");
    }
  };

  const calories = (BMR * activityLevelNum()) / parseInt(mealsPerDay);
  const protein = (calories * 0.2) / 4;
  const fat = (calories * 0.3) / 9;
  const carbs = (calories * 0.5) / 4;

  // ±20%
  const maxCalories = Math.round(calories * 1.2);
  const minCalories = Math.round(calories * 0.8);
  const maxProtein = Math.round(protein * 1.2);
  const minProtein = Math.round(protein * 0.8);
  const maxFat = Math.round(fat * 1.2);
  const minFat = Math.round(fat * 0.8);
  const maxCarbs = Math.round(carbs * 1.2);
  const minCarbs = Math.round(carbs * 0.8);

  // ±15%
  // const maxCalories = Math.round(calories * 1.15);
  // const minCalories = Math.round(calories * 0.85);
  // const maxProtein = Math.round(protein * 1.15);
  // const minProtein = Math.round(protein * 0.85);
  // const maxFat = Math.round(fat * 1.15);
  // const minFat = Math.round(fat * 0.85);
  // const maxCarbs = Math.round(carbs * 1.15);
  // const minCarbs = Math.round(carbs * 0.85);

  // ±10%
  // const maxCalories = Math.round(calories * 1.1);
  // const minCalories = Math.round(calories * 0.9);
  // const maxProtein = Math.round(protein * 1.1);
  // const minProtein = Math.round(protein * 0.9);
  // const maxFat = Math.round(fat * 1.1);
  // const minFat = Math.round(fat * 0.9);
  // const maxCarbs = Math.round(carbs * 1.1);
  // const minCarbs = Math.round(carbs * 0.9);

  let exclude = "";
  excludeIngredients.forEach((ing) => (exclude += ing.toLowerCase()));

  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&maxCalories=${maxCalories}&minCalories=${minCalories}&maxProtein=${maxProtein}&minProtein=${minProtein}&maxFat=${maxFat}&minFat=${minFat}&maxCarbs=${maxCarbs}&minCarbs=${minCarbs}&includeIngredients=${includeIngredients}&excludeIngredients=${exclude}&apiKey=${process.env.SPOONACULAR_API_KEY}`
    );

    if (!res.ok) {
      return null;
    }

    const recipes = await res.json();

    return recipes;
  } catch (err) {
    console.error("Calculation of nutrients Failed:", err);
  }
};

// const newDataArray = [];

// for (const recipe of recipes.results) {
//   const recipeObj = {
//     name: recipe?.title ?? "Unknown Recipe",
//     recipeId: recipe.id,
//     ingredients: recipe?.nutrition.ingredients ?? [],
//     imageURL: recipe?.image ?? "No image available",
//   };
//   const nutritionData = recipe.nutrition.nutrients.map(
//     (nutrient: Nutrition) => ({
//       recipeId: recipe.id,
//       name: nutrient.name,
//       amount: nutrient.amount,
//       unit: nutrient.unit,
//     })
//   );
//   newDataArray.push({ recipe: recipeObj, nutrition: nutritionData });
// }

// await prisma.recipe.createMany({
//   data: newDataArray.map(({ recipe }) => recipe),
// });
// for (const { nutrition } of newDataArray) {
//   await prisma.nutrition.createMany({ data: nutrition });
// }
