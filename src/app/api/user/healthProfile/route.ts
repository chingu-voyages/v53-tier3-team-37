import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "../../middlewares/loginAuth";
import parseBody from "../../utils/parseBody";
import { HealthProfile } from "../../middlewares/schemas";
import { updateHealthProfile } from "../../controllers/userController";
import { HealthProfileData } from "../../middlewares/schemas";

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

    const {
      age,
      sex,
      starting_weight,
      target_weight,
      height,
      lifestyle,
      foodRestrictions,
      healthIssues,
      activeDiet,
    } = body;

    const updateData: HealthProfileData = Object.fromEntries(
      Object.entries({
        age,
        sex,
        starting_weight,
        target_weight,
        current_weight: starting_weight,
        height,
        lifestyle,
        foodRestrictions,
        healthIssues,
        activeDiet,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      }).filter(([_, value]) => value !== undefined && value !== "NONE")
    );
    const validationResult = HealthProfile.safeParse(updateData);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: `Validation Failed: ${await validationResult.error}`,
        },
        { status: 400 }
      );
    }

    const message = await updateHealthProfile(userId, updateData);

    console.log(message);

    return NextResponse.json({ message }, { status: 200 });
  } catch (err) {
    console.error("Error in the Update Health Profile Route", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
