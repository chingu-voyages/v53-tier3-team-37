import { SignJWT, jwtVerify, JWTVerifyResult } from "jose";
import prisma from "./prisma";
import bcrypt from "bcryptjs";

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT Secret is not found");
}

// Create a TextEncoder instance for encoding the secret
const encoder = new TextEncoder();

export const encryptPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const validatePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
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
  name: string,
  password: string
) => {
  const hashedPassword = await encryptPassword(password);
  return await prisma.user.create({
    data: {
      email: email.toLowerCase(),
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

/**
 * Generates a JWT for the given userId.
 *
 * @param userId - The user ID to include in the token payload.
 * @returns A promise that resolves to a signed JWT string.
 */
export const generateToken = async (userId: string): Promise<string> => {
  const token = await new SignJWT({ id: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("4h")
    .sign(encoder.encode(secret));
  return token;
};

/**
 * Verifies the given JWT and returns its payload.
 *
 * @param token - The JWT string to verify.
 * @returns A promise that resolves to the token payload.
 * @throws an error if verification fails.
 */
export const verifyToken = async (
  token: string
): Promise<JWTVerifyResult["payload"]> => {
  try {
    const { payload } = await jwtVerify(token, encoder.encode(secret));
    return payload;
  } catch (err) {
    if (err instanceof Error) {
      console.error("JWT Verification Error:", err.name, err.message);
      if (err.name === "JWTExpired") {
        throw new Error("Token has expired");
      } else if (err.name === "JWTInvalid") {
        throw new Error("Invalid token");
      }
    }
    throw new Error("Token verification failed");
  }
};
