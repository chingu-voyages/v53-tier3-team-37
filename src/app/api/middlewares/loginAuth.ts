import * as authService from "../services/authService";
import { NextRequest, NextResponse } from "next/server";

interface AuthenticatedRequest extends NextRequest {
  user: { id: string };
}

export const isAuthenticated = (
  req: NextRequest
): AuthenticatedRequest | NextResponse => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized: Missing or Invalid Authorization Header" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url), { status: 302 });
  }

  try {
    const decoded = authService.verifyToken(token) as { id: string };

    const authenticatedRequest = req as AuthenticatedRequest;
    authenticatedRequest.user = { id: decoded.id };

    const headers = new Headers(req.headers);
    headers.set("x-user-id", decoded.id);

    return authenticatedRequest;
  } catch (err) {
    console.error("Authentication Error:", err);

    return NextResponse.json(
      { error: "Invalid or Expired Token" },
      { status: 401 }
    );
  }
};
