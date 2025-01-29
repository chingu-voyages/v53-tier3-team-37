import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "../../middlewares/loginAuth";
import parseBody from "../../utils/parseBody";
import { HealthProfile } from "../../middlewares/schemas";
import { updateHealthProfile } from "../../controllers/userController";

export async function PATCH(req: NextRequest) {
  const authResponse = isAuthenticated(req);
  if (authResponse instanceof NextResponse) return authResponse;

  try {
    const userId = (authResponse as { user: { id: string } }).user.id;
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is missing from the header" },
        { status: 401 }
      );
    }
    const body = await parseBody(req);
    const validationResult = HealthProfile.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation Failed", details: validationResult.error.issues },
        { status: 400 }
      );
    }
    const {
      age,
      sex,
      weight,
      height,
      lifestyle,
      foodRestrictions,
      healthIssues,
      activeDiet,
    } = body;

    const response = await updateHealthProfile(
      userId,
      age,
      sex,
      weight,
      height,
      lifestyle,
      foodRestrictions,
      healthIssues,
      activeDiet
    );

    return response;
  } catch (err) {
    console.error("Error in the Update Health Profile Route", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
