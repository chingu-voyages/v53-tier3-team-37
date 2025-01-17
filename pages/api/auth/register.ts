import { registerUser } from "@/api/controllers/authController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await registerUser(req, res);
}
