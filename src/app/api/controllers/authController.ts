// import prisma from "../services/prisma.js";
import { NextResponse } from "next/server";
import * as authService from "../services/authService";

// register
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const existingUser = await authService.findUserByEmail(email);
    if (existingUser) {
      throw new Error("Email is Already Registered");
    }

    const user = await authService.createUser(email, name, password);
    const token = await authService.generateToken(user.id);
    return { token, message: "User Registered Successfully" };
  } catch (err) {
    console.error("Registration Failed:", err);
    throw err;
  }
};

// login
export const loginUser = async (email: string, password: string) => {
  try {
    const user = await authService.findUserByEmail(email);
    if (!user || !user.credentials) {
      return NextResponse.json(
        { error: "Can't find a user with that email and password" },
        { status: 401 }
      );
    }

    if (
      user.credentials.type !== "PASSWORDHASH" ||
      !authService.validatePassword(password, user.credentials.value)
    ) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 401 }
      );
    }

    const token = authService.generateToken(user.id);
    return { token, message: "User Found and Authenticated" };
  } catch (err) {
    console.error("Error in login:", err);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
};
