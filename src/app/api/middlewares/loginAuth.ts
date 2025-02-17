// src/app/api/middlewares/loginAuth.ts
import { NextRequest, NextResponse } from "next/server";
import * as authService from "../services/authService";

interface AuthenticatedRequest extends NextRequest {
  user: { id: string };
}

export const isAuthenticated = async (
  req: NextRequest
): Promise<AuthenticatedRequest | NextResponse> => {
  const token = req.cookies.get("jwt")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url), { status: 303 });
  }

  try {
    console.log("trying to authenticate...");
    const decoded = await authService.verifyToken(token);
    const authenticatedRequest = req as AuthenticatedRequest;
    // Ensure that your JWT payload contains an "id" property.
    authenticatedRequest.user = { id: decoded.id as string };
    console.log("Authenticated!");
    return authenticatedRequest;
  } catch (err) {
    console.error("Authentication Error:", err);
    return NextResponse.redirect(new URL("/login", req.url), { status: 303 });
  }
};
