import { requestOTP } from "@/api/controllers/userController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await requestOTP(req, res);
}
