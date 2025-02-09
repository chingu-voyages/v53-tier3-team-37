import { NextResponse } from "next/server";
import * as queryService from "../services/queryService";
import { SearchQueryType } from "../queryRecipes/route";

export const queryRecipes = async (filters: SearchQueryType) => {
  try {
    const recipes = await queryService.getRecipesFromDB(filters);
    if (!recipes) {
      return NextResponse.json({ error: "No recipes found" }, { status: 404 });
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
