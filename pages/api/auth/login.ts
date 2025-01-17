import { login } from "@/api/controllers/authController";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await login(req, res);
}
