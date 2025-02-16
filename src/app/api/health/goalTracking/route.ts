import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "../../middlewares/loginAuth";
import parseBody from "../../utils/parseBody";
// import prisma from "../../services/prisma";
import { storeTrackingData } from "../../controllers/userController";
import { TrackingUpdate } from "../../middlewares/schemas";

export async function POST(req: NextRequest) {
  const authResponse = isAuthenticated(req);
  if (authResponse instanceof NextResponse) return authResponse;

  try {
    const userId = (authResponse as { user: { id: string } }).user.id;
    const body = await parseBody(req);
    const validationResult = TrackingUpdate.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { type, amount } = validationResult.data;

    const stored = await storeTrackingData(userId, type, amount);
    console.log("Stored:", stored);
    if (!stored) {
      return NextResponse.json(
        { error: "Failed to submit tracking data" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: `Goal Tracking Data Stored: ${stored}` },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error while trying to store goal tracking update:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
