// import { isAuthenticated } from "../middleware/loginAuth";
import { encryptPassword } from "../services/authService";
import * as userService from "../services/userService";
// import {
//   ActivityLevel,
//   Diet,
//   Gender,
//   HealthIssue,
//   Sensitivity,
// } from "@prisma/client";
import { HealthProfileData } from "../middlewares/schemas";

export const changePassword = async (userId: string, password: string) => {
  try {
    const newPassword = await encryptPassword(password);

    const success = await userService.updatePassword(userId, newPassword);

    if (!success) {
      throw new Error("Attempt to update Password Failed");
    }
    return { message: "Password Updated Successfully" };
  } catch (err) {
    console.error("Password Update Failed:", err);
    throw err;
  }
};

export const requestOTP = async (email: string) => {
  try {
    const requested = await userService.requestOTPService(email);

    if (requested) {
      return { message: `OTP Sent to User Email: ${email}` };
    } else {
      throw new Error(
        "There was an issue requesting a one time pin for this account"
      );
    }
  } catch (err) {
    console.error("Error Requesting OTP:", err);
    throw err;
  }
};

// next

export const otpResponse = async (
  email: string,
  otp: string,
  newPassword: string
) => {
  try {
    const updated = await userService.checkOtp(email, otp, newPassword);

    if (updated === true) {
      return { message: "OTP Successfully Verified -- Password Updated" };
    }
  } catch (err) {
    console.error("Error verifying otp", err);
    throw err;
  }
};

export const updateHealthProfile = async (
  id: string,
  dataObj: HealthProfileData
) => {
  try {
    const returned = await userService.handleHealthData(id, dataObj);
    console.log("Returned:", returned);
    if (returned === true) {
      return { message: "Health Profile Data Submitted Successfully" };
    } else {
      throw new Error("Health Profile Update Failed!");
    }
  } catch (err) {
    console.error("Error Submitting Health Profile Updates", err);
    throw err;
  }
};
