import { getRecipes } from "@/app/api/_services/recipeService";
import { NextRequest, NextResponse } from "next/server";
// import { isAuthenticated } from "../middlewares/loginAuth";
import prisma from "../services/prisma";
import { getIdFromRequest } from "../services/userService";

export async function GET(req: NextRequest) {
  console.log("Request to...", req.url);
  const userId = await getIdFromRequest(req);
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
  const query = searchParams.get("search") || " ";
  const mealsPerDay = "3";
  const weight = `${user.current_weight}`;
  const height = `${user.height}`;
  const age = `${user.age}`;
  const activityLevel = user.lifestyle;
  const gender = user.sex?.toLowerCase();
  const includeIngredients = searchParams.get("includeIngredients") || "";
  const excludeIngredients = user.foodRestrictions;

  if (
    !weight ||
    !height ||
    !age ||
    !activityLevel ||
    !gender ||
    !mealsPerDay ||
    !query
  ) {
    return NextResponse.json(
      {
        message: `All fields are required:
        weight: ${weight}
        height: ${height}
        age: ${age}
        activityLevel: ${activityLevel}
        gender: ${gender}
        mealCount: ${mealsPerDay}
        SearchQuery: ${query}
        `,
      },
      { status: 400 }
    );
  }

  try {
    const recipes = await getRecipes(
      query,
      weight,
      height,
      age,
      activityLevel!,
      gender!,
      mealsPerDay,
      includeIngredients || "",
      excludeIngredients
    );

    console.log("Recipes:", recipes);
    if (!recipes || recipes === null) {
      return NextResponse.json(
        { message: "Failed to fetch recipes" },
        { status: 400 }
      );
    }

    return NextResponse.json(recipes, { status: 200 });
  } catch (err) {
    console.error("Calculation of nutrients Failed:", err);
    return NextResponse.json(
      { message: `Failed to fetch recipes: ${err}` },
      { status: 400 }
    );
  }
}
