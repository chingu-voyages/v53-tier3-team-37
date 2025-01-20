import { JwtPayload } from "jsonwebtoken";
import * as authService from "../services/authService.js";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const isAuthenticated = (handler: NextApiHandler) => {
  return async (
    req: NextApiRequest & { user?: JwtPayload },
    res: NextApiResponse
  ) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = authService.verifyToken(token) as { id: string };

      req.user = { id: decoded.id };
      return handler(req, res); // passes the modified request to the handler
    } catch (err) {
      console.error("User not authenticated", err)
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
};

