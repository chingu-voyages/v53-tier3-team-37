import { getRecipes } from "@/app/api/_services/recipeService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const weight = searchParams.get("weight");
  const height = searchParams.get("height");
  const age = searchParams.get("age");
  const activityLevel = searchParams.get("activityLevel");
  const gender = searchParams.get("gender");
  const mealsPerDay = searchParams.get("mealsPerDay") || "3";
  const diet = searchParams.get("diet") || "";
  const includeIngredients = searchParams.get("includeIngredients") || "";
  const excludeIngredients = searchParams.get("excludeIngredients") || "";

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
    typeof gender !== "string"
  ) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  if (
    typeof mealsPerDay !== "string" ||
    typeof diet !== "string" ||
    typeof includeIngredients !== "string" ||
    typeof excludeIngredients !== "string"
  ) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  if (gender !== "man" && gender !== "woman") {
    return NextResponse.json(
      { message: "gender should be man or woman" },
      { status: 400 }
    );
  }

  if(diet !== "" && diet !== "vegetarian" && diet !== "vegan" && diet !== "gluten free" && diet !== "dairy free" && diet !== "ketogenic" && diet !== "lacto vegetarian" && diet !== "ovo vegetarian" && diet !== "pescatarian" && diet !== "paleolithic" && diet !== "primal" && diet !== "whole 30" && diet !== "low fodmap") {
    return NextResponse.json(
      { message: "Unexpected diet" },
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
      diet,
      includeIngredients,
      excludeIngredients
    );

    console.log("🐉", recipes);

    if (recipes === null) {
      return NextResponse.json(
        { message: "Failed to fetch recipes" },
        { status: 400 }
      );
    }

    if (!recipes) {
      return NextResponse.json(
        { message: "No recipe returned" },
        { status: 400 }
      );
    }

    return NextResponse.json(recipes, { status: 200 });
  } catch (err) {
    console.error("Calculation of nutrients Failed:", err);
  }
}
