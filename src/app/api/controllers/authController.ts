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
      return NextResponse.json(
        { error: "Email is Already Registered" },
        { status: 400 }
      );
    }

    const user = await authService.createUser(email, name, password);
    return NextResponse.json(
      { message: "User Registered Successfully", user },
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration Failed:", err);
  }
};

// login
export const loginUser = async (email: string, password: string) => {
  try {
    const user = await authService.findUserByEmail(email);
    if (!user || !user.credentials) {
      return NextResponse.json(
        { error: "Can't find a user with that eamil and password" },
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
    return NextResponse.json(
      { message: "Login Successful", token },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in login:", err);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
};
