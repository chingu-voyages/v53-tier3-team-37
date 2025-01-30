import { Middleware } from "../utils/middlewares";
// import { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

interface AppError extends Error {
  code?: string;
}
export class ValidationError extends Error {
  constructor(public validationErrors: z.ZodIssue[]) {
    super("Validation Error");
    console.error("Validation Errors:", validationErrors);
    this.name = "ValidationError";
  }
}

const errorHandler: Middleware = async (
  req,
  res,
  next,
  err?: unknown
): Promise<void> => {
  if (err instanceof ValidationError) {
    return res
      .status(400)
      .json({ error: "Validation Error", details: err.validationErrors });
  }

  if (err instanceof Error) {
    if (err?.message === "404" || (err as AppError).code === "P2025") {
      if ("code" in err) console.error("Error Code:", err.code);
      return res.status(404).json({ error: "Resource Not Found" });
    }
    console.error("Error Message:", err.message);
    console.error("Error Stack:", err.stack);
  }

  res.status(500).json({ error: "Internal Server Error" });
};

export default errorHandler;
