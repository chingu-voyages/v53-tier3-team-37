import { isAuthenticated } from "@/api/middleware/loginAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: "Access granted!", user: req.user });
};

export default isAuthenticated(handler);
