import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "./prisma";
import { CredentialType } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";

const providerToCredentialType: Record<string, CredentialType> = {
  APPLE: "APPLEID",
  GOOGLE: "GOOGLEID",
  GITHUB: "GITHUBID",
};

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
  provider: string
) => {
  const credential = providerToCredentialType[provider.toUpperCase()];
  if (!credential) {
    throw new Error(`Unsupported provider: ${provider}`);
  }
  let user = await prisma.user.findUnique({
    where: { email },
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
            type: credential,
            value: "OAUTH",
          },
        },
      },
    });
  }
  return user;
};

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, secret, { expiresIn: "4h" });
};

export const verifyToken = (token: string): string | JwtPayload => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
