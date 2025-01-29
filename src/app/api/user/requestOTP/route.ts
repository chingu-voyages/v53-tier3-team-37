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
  await requestOTP(email);

  return NextResponse.json(
    { message: "OTP Created and Sent Successfully" },
    { status: 200 }
  );
}
