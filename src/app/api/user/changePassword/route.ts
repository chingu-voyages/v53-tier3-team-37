import { changePassword } from "@/app/api/controllers/userController";
import { NextRequest, NextResponse } from "next/server";
import parseBody from "../../utils/parseBody";
import { PasswordUpdate } from "../../middlewares/schemas";
import { isAuthenticated } from "../../middlewares/loginAuth";

export async function PATCH(req: NextRequest) {
  const authResponse = isAuthenticated(req);
  if (authResponse instanceof NextResponse) return authResponse; // return the response if !authenticated

  try {
    const userId = (authResponse as { user: { id: string } }).user.id;
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is missing from the header" },
        { status: 401 }
      );
    }
    const body = await parseBody(req);
    const validationResult = PasswordUpdate.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation Failed", details: validationResult.error.issues },
        { status: 400 }
      );
    }
    const { password } = validationResult.data;
    if (!password) {
      return NextResponse.json(
        { error: "Password is missing" },
        { status: 401 }
      );
    }

    const message = await changePassword(userId, password);

    const res = NextResponse.json({ message }, { status: 200 });
    return res;
  } catch (err) {
    console.error("Error in the Change Password Route", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
