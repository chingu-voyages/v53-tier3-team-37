import { otpResponse } from "@/app/api/controllers/userController";
import { NextRequest, NextResponse } from "next/server";
import parseBody from "../../utils/parseBody";
import { PasswordUpdate } from "../../middlewares/schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await parseBody(req);
    const { email, otp, newPassword } = body;
    const validationResult = PasswordUpdate.safeParse({
      password: newPassword,
    });
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Pick a Better Password",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        {
          error: "All Fields Must Be Submitted",
        },
        { status: 400 }
      );
    }
    await otpResponse(email, otp, newPassword);

    return NextResponse.json(
      { message: "OTP Password Reset Successful" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error Responding to OTP Submission", err);
    return NextResponse.json(
      { error: "Response to OTP Failed" },
      { status: 500 }
    );
  }
}
