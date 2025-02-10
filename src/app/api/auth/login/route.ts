import { loginUser } from "../../controllers/authController";
import { NextRequest, NextResponse } from "next/server";
import { Login } from "../../middlewares/schemas";
import parseBody from "../../utils/parseBody";

export async function POST(req: NextRequest) {
  try {
    const body = await parseBody(req);
    const validationResult = Login.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;
    const { token, user, message } = await loginUser(email, password!);

    const res = NextResponse.json(
      { message, userSurveyed: user.surveyed },
      { status: 200 }
    );
    res.cookies.set("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
    });
    return res;
  } catch (err) {
    console.error("Error in the Login Route", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
