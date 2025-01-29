import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "./prisma";
// import { CredentialType } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Provider } from "@prisma/client";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT Secret is not found");
}

export const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const validatePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: { email: email.toLowerCase() },
    include: { credentials: true },
  });
};

export const createUser = async (
  email: string,
  username: string,
  name: string,
  password: string
) => {
  const hashedPassword = await encryptPassword(password);
  return await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      username,
      name,
      credentials: {
        create: {
          type: "PASSWORDHASH",
          value: hashedPassword,
        },
      },
    },
  });
};

export const findOrCreateUserWithOAuth = async (
  email: string,
  name: string,
  providerId: string,
  provider: Provider
) => {
  let user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    let username = email.split("@")[0];

    // check if this username is already taken
    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (existingUser) {
      username = `${username}_${crypto.randomBytes(3).toString("hex")}`;
    }
    user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        username,
        credentials: {
          create: {
            type: "OAUTH",
            value: providerId,
            provider,
          },
        },
      },
    });
  } else {
    const userCredential = await prisma.credential.findFirst({
      where: { userId: user.id, type: "OAUTH" },
    });

    if (!userCredential || userCredential.value !== providerId) {
      throw new Error(
        `OAuth user mismatch or invalid credentials for provider: ${provider}`
      );
    }
  }

  const token = generateToken(user.id);
  return { user, token };
};

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, secret, { expiresIn: "4h" });
};

export const verifyToken = (token: string): string | JwtPayload => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === "TokenExpiredError") {
        throw new Error("Token has expired");
      } else if (err.name === "JsonWebTokenError") {
        throw new Error("Invalid token");
      }
    }
    throw new Error("Token verification failed");
  }
};
