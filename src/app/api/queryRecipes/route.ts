import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "../middlewares/loginAuth";
import { queryRecipes } from "../controllers/queryController";
// import { validateQueryParam } from "../middlewares/validation";
import { SearchQuery } from "../middlewares/schemas";
import { z } from "zod";

export type SearchQueryType = z.infer<typeof SearchQuery>;

export async function GET(req: NextRequest) {
  const authResponse = isAuthenticated(req);
  if (authResponse instanceof NextResponse) return authResponse;

  const queryParams = Object.fromEntries(req.nextUrl.searchParams.entries());

  const validationResult = SearchQuery.safeParse(queryParams);

  if (!validationResult.success) {
    return NextResponse.json(
      { error: "Validation Error", issues: validationResult.error.issues },
      { status: 400 }
    );
  }

  const filters: SearchQueryType = validationResult.data;

  try {
    const recipes = await queryRecipes(filters);

    return NextResponse.json(
      { message: "Recipes returned for criteria", recipes },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error Satisfying Recipe Search", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
