import { getRecipes } from "@/app/api/_services/recipeService";
import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "../middlewares/loginAuth";
import prisma from "../services/prisma";

export async function GET(req: NextRequest) {
  const authResponse = isAuthenticated(req);
  if (authResponse instanceof NextResponse) return authResponse;

  const userId = (authResponse as { user: { id: string } }).user.id;
  if (!userId) {
    return NextResponse.json(
      { error: "Can't get the user id from the auth cookie" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "User Not Found!" }, { status: 404 });
  }

  const { searchParams } = new URL(req.url);
  const mealsPerDay = searchParams.get("mealsPerDay") || "3";
  const weight = `${user.current_weight}`;
  const height = `${user.height}`;
  const age = `${user.age}`;
  const activityLevel = user.lifestyle;
  const gender = user.sex?.toLowerCase();
  const includeIngredients = searchParams.get("includeIngredients") || "";
  const excludeIngredients = user.foodRestrictions;

  // const minCalories = searchParams.get("caloriesMin");
  // const maxCalories = searchParams.get("caloriesMax");
  // const minProtein = searchParams.get("proteinMin");
  // const maxProtein = searchParams.get("proteinMax");
  // const minFat = searchParams.get("fatMin");
  // const maxFat = searchParams.get("fatMax");
  // const minCarbs = searchParams.get("carbohydratesMin");
  // const maxCarbs = searchParams.get("carbohydratesMax");

  if (
    !weight ||
    !height ||
    !age ||
    !activityLevel ||
    !gender ||
    !mealsPerDay ||
    typeof weight !== "string" ||
    typeof height !== "string" ||
    typeof age !== "string" ||
    typeof activityLevel !== "string" ||
    typeof gender !== "string" ||
    typeof mealsPerDay !== "string"
  ) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const recipes = await getRecipes(
      weight,
      height,
      age,
      activityLevel,
      gender,
      mealsPerDay,
      includeIngredients,
      excludeIngredients
    );

    if (!recipes || recipes === null) {
      return NextResponse.json(
        { message: "Failed to fetch recipes" },
        { status: 400 }
      );
    }

    return NextResponse.json(recipes, { status: 200 });
  } catch (err) {
    console.error("Calculation of nutrients Failed:", err);
  }
}
