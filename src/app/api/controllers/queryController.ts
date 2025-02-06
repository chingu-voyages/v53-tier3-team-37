import { NextResponse } from "next/server";
import * as queryService from "../services/queryService";

export const queryRecipes = async () => {
  try {
    const recipes = await queryService.getRecipesFromDB();
    if (!recipes) {
      return NextResponse.json({ error: "Recipes Not Found" }, { status: 404 });
    }
    return NextResponse.json(recipes, {
      headers: {
        "Cache-Control": "s-maxage=120, stale-while-revalidate=30",
      },
    });
  } catch (err) {
    console.error("Error getting recipes from internal collection", err);
    return NextResponse.json(
      { error: "Failed to get recipes from database or cache" },
      { status: 500 }
    );
  }
};
