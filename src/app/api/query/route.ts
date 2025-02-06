import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "../../api/middlewares/loginAuth";
import { queryRecipes } from "../controllers/queryController";

export async function GET(req: NextRequest) {
  const authResponse = isAuthenticated(req);
  if (authResponse instanceof NextResponse) return authResponse;

  try {
    await queryRecipes();
  } catch (err) {
    console.error("Error Satisfying Recipe Search", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
