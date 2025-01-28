import { encryptPassword } from "./authService";
import prisma from "./prisma";
import nodemailer from "nodemailer";
import { validatePassword } from "./authService";

export const updatePassword = async (userId: string, newPassword: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    console.error("This user doesn't exist");
  }
  const updatedHash = await encryptPassword(newPassword);
  await prisma.credential.update({
    where: { userId: userId },
    data: {
      value: updatedHash,
    },
  });
};

const generateOTP = async () => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    return otp;
  } catch (err) {
    console.error("Failed to generate OTP:", err);
    throw err;
  }
};

export const requestOTPService = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return;

  const otp = await generateOTP();
  if (otp) {
    await prisma.oneTimePassword.deleteMany({
      where: {
        email,
      },
    });
  }

  const expiration = new Date(Date.now() + 60 * 60 * 1000);

  const hashedOTP = await encryptPassword(otp);
  const otpCreated = await prisma.oneTimePassword.create({
    data: {
      email: email,
      otp: hashedOTP,
      expiresAt: expiration,
      userId: user.id,
    },
  });
  console.log("Status:", otpCreated);

  try {
    console.log("Email sending to:", email);
    await sendOTPEmail(email, otp);
  } catch (error) {
    console.error("Failed to send password reset email:", error);
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Gmail address
    pass: process.env.EMAIL_PASS, // Gmail app-specific password
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for messages");
    console.log(success);
  }
});

const sendOTPEmail = async (userEmail: string, otp: string) => {
  console.log("Generating email...");
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Request to Reset Password",
    text: `
Hello!

We received a request to reset the password on the account associated with this email.
Access your Account With One-Time Password Below:
${otp}

However, if you did not initiate this request, you can reach out to us at Best.Reciplease@gmail.com for further support in securing your account.

Regards,
Reciplease Team
    `,
    html: `
    <h1>Hello ${userEmail.split("@")[0]}!</h1>
    <br />
    <p>We received a request to reset the password on the account associated with this email.</p>
    <p>You can access your Account with the One-Time Password Below:</p>
    <h1 style="color: #aa0303">${otp}</h1>
    <p>This Password expires in 1 hour</p>
    <br />
    <p>However, if you did not initiate this request, you can reach out to us at Reciplease@gmail.com for further support in securing your account.</p>
    <br />
    <br />
    <p>Regards,</p>
    <h3>Reciplease Team</h3>
    `,
  };

  console.log("Request Created");

  // Return a promise for better error handling
  return transporter.sendMail(mailOptions);
};

export const checkOtp = async (
  email: string,
  otp: string,
  newPassword: string
) => {
  const otpObject = await prisma.oneTimePassword.findUnique({
    where: {
      email,
    },
  });
  console.log("otp Obj:", otpObject);
  const currentTime = new Date(Date.now());
  const expired = currentTime > otpObject!.expiresAt;
  console.log("Expired?", expired);

  if (!otpObject || expired) {
    throw Error("OTP Expired or Non-Existant");
  }

  const success = await validatePassword(otp, otpObject.otp);
  if (!success) {
    throw Error("OTP Mismatch");
  }
  console.log("Success?", success);

  const hashedPassword = await encryptPassword(newPassword);
  console.log(hashedPassword);

  if (!otpObject.userId) {
    throw new Error("User ID is missing in OTP record");
  }

  const updated = await prisma.credential.update({
    where: {
      userId: otpObject.userId,
    },
    data: {
      value: hashedPassword,
    },
  });
  return updated;
};
