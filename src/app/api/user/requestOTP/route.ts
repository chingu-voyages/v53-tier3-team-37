import { requestOTP } from "@/app/api/controllers/userController";
import { NextRequest, NextResponse } from "next/server";
import parseBody from "../../utils/parseBody";

export async function POST(req: NextRequest) {
  const body = await parseBody(req);
  const { email } = body;
  if (!email) {
    return NextResponse.json(
      { error: "Please Provide Your Account Email" },
      { status: 500 }
    );
  }
  try {
    const { message } = await requestOTP(email);

    return NextResponse.json(
      { response: "OTP Created and Sent Successfully:", message },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in the request otp route", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
