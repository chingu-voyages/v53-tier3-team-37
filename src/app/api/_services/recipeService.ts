// Mifflin-St Jeor method to calculate BMR

export const getRecipes = async (
  weight: string,
  height: string,
  age: string,
  activityLevel: string,
  gender: string,
  mealsPerDay: string = "3",
  diet: string = "",
  includeIngredients: string ="",
  excludeIngredients: string =""
) => {
  const addBMR = gender === "man" ? 5 : -161;
  const BMR =
    10 * parseFloat(weight) +
    6.25 * parseFloat(height) -
    5 * parseInt(age) +
    addBMR;

  const activityLevelNum = () => {
    switch (activityLevel) {
      case "sedentary":
        return 1.2;
      case "lightly active":
        return 1.375;
      case "moderately active":
        return 1.55;
      case "very active":
        return 1.725;
      case "super active":
        return 1.9;
      default:
        throw new Error("Invalid activity level");
    }
  };

  const calories = (BMR * activityLevelNum()) / parseInt(mealsPerDay);

  // ±10%
  const maxCalories = Math.round(calories * 1.1);
  const minCalories = Math.round(calories * 0.9);
  

  try {
    // only calories
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?maxCalories=${maxCalories}&minCalories=${minCalories}&addRecipeNutrition=true&instructionsRequired=true&diet=${diet}&includeIngredients=${includeIngredients}&excludeIngredients=${excludeIngredients}&apiKey=${process.env.SPOONACULAR_API_KEY}`
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
