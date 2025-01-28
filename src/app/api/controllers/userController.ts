// import { isAuthenticated } from "../middleware/loginAuth";
import { NextResponse } from "next/server";
import { encryptPassword } from "../services/authService";
import * as userService from "../services/userService";

export const changePassword = async (userId: string, password: string) => {
  try {
    // const userId = req.user?.id;
    // if (!userId) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }
    //   make sure user isnt assigning itself new roles

    const newPassword = await encryptPassword(password);

    await userService.updatePassword(userId, newPassword);
    return NextResponse.json(
      { message: "Password Updated Successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating password:", err);
    return NextResponse.json(
      { error: "Failed to Update Password" },
      { status: 500 }
    );
  }
};

export const requestOTP = async (email: string) => {
  try {
    await userService.requestOTPService(email);

    return NextResponse.json(
      { message: "OTP Sent to User Email" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error Requesting OTP:", err);
    return NextResponse.json(
      { error: "Failed to Request an OTP" },
      { status: 500 }
    );
  }
};

// next

export const otpResponse = async (
  email: string,
  otp: string,
  newPassword: string
) => {
  try {
    await userService.checkOtp(email, otp, newPassword);

    return NextResponse.json(
      { message: "OTP Successfully Verified" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error verifying otp", err);
    return NextResponse.json(
      { error: "Failed to Verify OTP" },
      { status: 500 }
    );
  }
};
