import * as authService from "../services/authService";
import { NextRequest, NextResponse } from "next/server";

interface AuthenticatedRequest extends NextRequest {
  user: { id: string };
}

export const isAuthenticated = (
  req: NextRequest
): AuthenticatedRequest | NextResponse => {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url), { status: 303 });
  }

  try {
    console.log("trying to authenticate...");
    const decoded = authService.verifyToken(token) as { id: string };

    const authenticatedRequest = req as AuthenticatedRequest;
    authenticatedRequest.user = { id: decoded.id };

    console.log("Authenticated!");
    return authenticatedRequest;
  } catch (err) {
    console.error("Authentication Error:", err);

    return NextResponse.redirect(new URL("/login", req.url), { status: 303 });
  }
};
