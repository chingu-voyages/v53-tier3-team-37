import { encryptPassword } from "../services/authService";
import * as userService from "../services/userService";
import { NextApiRequest, NextApiResponse } from "next";

export const changePassword = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    //   make sure user isnt assigning itself new roles
    delete req.body.roles;

    const newPassword = await encryptPassword(req.body.password);

    await userService.updatePassword(userId, newPassword);
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    return res.status(500).json({ error: "Failed to update password" });
  }
};

export const requestOTP = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const email = req.body.email;
    if (!email)
      return res
        .status(401)
        .json({ error: "The email is missing from the request body" });

    await userService.requestOTPService(email);

    return res
      .status(200)

      .json({ message: "OTP Request Received" });
  } catch (err) {
    console.error("Error requesting otpt", err);
    return res.status(500).json({ error: "Failed to otp" });
  }
};

// next

export const otpResponse = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email) {
      res.status(401).json({ message: "User email is missing" });
    }
    if (!otp) {
      res
        .status(401)
        .json({ message: "Please enter One Time Password to Verify Identity" });
    }
    if (!newPassword) {
      res.status(401).json({ message: "New Password is Missing" });
    }
    console.log(email, otp, newPassword);
    await userService.checkOtp(email, otp, newPassword);

    return res
      .status(200)
      .json({ message: "OTP Used Successfully! Password Updated!" });
  } catch (err) {
    console.error("Error verifying otp", err);
    return res.status(500).json({ error: "Failed to link otp to user email" });
  }
};
