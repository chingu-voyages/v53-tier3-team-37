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
    const xssResponse = xssMiddleware(req);
    if (xssResponse) return xssResponse; // If XSS middleware blocks, return early

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
  matcher: "/:path*", // Adjust paths as needed
};

