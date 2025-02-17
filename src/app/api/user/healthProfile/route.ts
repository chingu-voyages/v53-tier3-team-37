import { NextRequest, NextResponse } from "next/server";
// import { isAuthenticated } from "../../middlewares/loginAuth";
import parseBody from "../../utils/parseBody";
import { HealthProfile } from "../../middlewares/schemas";
import { updateHealthProfile } from "../../controllers/userController";
import { HealthProfileData } from "../../middlewares/schemas";
import prisma from "../../services/prisma";
import { getIdFromRequest } from "../../services/userService";

export async function PATCH(req: NextRequest) {
  // Authenticate the request and extract user id
  const userId = await getIdFromRequest(req);
  if (!userId) {
    return NextResponse.json(
      { error: "User ID is missing from the header or JWT cookie" },
      { status: 401 }
    );
  }

  try {
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

export async function GET(req: NextRequest) {
  const userId = await getIdFromRequest(req);
  if (!userId) {
    return NextResponse.json(
      { error: "User ID is missing from the header" },
      { status: 401 }
    );
  }

  try {
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        healthLogs: true, // dietary logs
        goals: true, // health goals
        favorites: true, // favorite recipes
      },
    });

    if (!userData) {
      return NextResponse.json(
        { error: "Failed to retrieve the user data" },
        { status: 404 }
      );
    }

    return NextResponse.json({ userData }, { status: 200 });
  } catch (err) {
    console.error("Error fetching the User Profile Information", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
