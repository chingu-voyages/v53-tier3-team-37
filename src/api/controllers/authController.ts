import prisma from "../services/prisma.js";
import * as authService from "../services/authService";
import { NextApiRequest, NextApiResponse } from "next";

// register
export const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { email, username, name, password } = req.body;

  if (!email || !username || !name || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await authService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const user = await authService.createUser(email, username, name, password);
    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("Registration Failed:", err);
  }
};

// login
export const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await authService.findUserByEmail(email);
    if (!user || !user.credentials) {
      return res
        .status(401)
        .json({ error: "Can't find a user with that email and password." });
    }

    const hashedPassword = user.credentials.value;
    if (
      !hashedPassword ||
      !(await authService.validatePassword(password, hashedPassword))
    ) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = authService.generateToken(user.id);
    return res.status(200).json({ token });
  } catch (err) {
    console.error("Error in login:", err);
    return res.status(500).json({ error: "Failed to login" });
  }
};
