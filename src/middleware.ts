<<<<<<< HEAD
import type { NextRequest } from "next/server";
import { xssMiddleware } from "@/app/api/middlewares/xss";

export default async function middleware(req: NextRequest) {
  return xssMiddleware(req);
}

export const config = {
  matcher: ["/api/"],
};
=======
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { xssMiddleware } from "@/app/api/middlewares/xss";


interface AuthenticatedRequest extends NextRequest {
  nextauth?: {
    token?: {
      surveyed?: boolean;
    };
  };
}

export default withAuth(
  async function middleware(req: NextRequest) {
    console.log("middleware running");
    // Run XSS protection first
    const xssResponse = await xssMiddleware(req);
    if (xssResponse.status !== 200) {
      console.log("xss response")
      return xssResponse;
    } 

    const user = (req as AuthenticatedRequest).nextauth?.token || null;
    console.log("Requested URL: ", req.url);
    // If user is logged in but hasn't completed the survey, redirect them
    if (user && user.surveyed === false) {
      return NextResponse.redirect(new URL("/register/survey", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Only allow authenticated users
    },
  }
);

export const config = {
  matcher: [
    "/health/:path*",
    "/log/:path*",
    "/pantry/:path*",
    "/profile/:path*",
    "/recipes/:path*",
  ],
};

>>>>>>> main
