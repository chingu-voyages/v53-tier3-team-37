import jwt from "jsonwebtoken";
import prisma from "./prisma";
import bcrypt from "bcrypt";

const secret = process.env.JWT_SECRET;

async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
}

async function validatePassword(password: string, hash: string) {
  const validation = await bcrypt.compare(password, hash);
  //   debug
  console.log(validation);
  return validation;
}

// we will need to also handle oAuth credentials here

// GitHub, Apple, Google
