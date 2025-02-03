import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// Ensure .env is loaded, think we can remove this check at production
dotenv.config();

const prisma = new PrismaClient();

export default prisma;
