import { registerUser } from "../../controllers/authController";
import { NextRequest, NextResponse } from "next/server";
import { Account } from "../../middlewares/schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Get the body from the request
    const validationResult = Account.safeParse(body);

    if (!validationResult.success) {
      console.log(validationResult.error);
      return NextResponse.json(
        { error: "Validation failed:", validationResult },
        { status: 400 }
      );
    }

    // Call the controller logic to register the user
    const { name, email, password } = validationResult.data;
    const { token, message } = await registerUser(name, email, password);
    const res = NextResponse.json({ message }, { status: 201 });
    res.cookies.set("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/", // makes sure the cookie is available site-wide
      sameSite: "strict",
    });
    return res;
  } catch (err) {
    console.error("Error during registration:", err);
    return NextResponse.json(
      { error: "Internal Server Error:", err },
      { status: 500 }
    );
  }
}
