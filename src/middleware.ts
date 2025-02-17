import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated as isNativeAuthenticated } from "@/app/api/middlewares/loginAuth"; // adjust the import path as needed
import { getToken } from "next-auth/jwt";
import { xssMiddleware } from "@/app/api/middlewares/xss";

export default async function middleware(req: NextRequest) {
  // First, run the XSS middleware to validate/sanitize headers, URL params, etc.
  const xssResponse = await xssMiddleware(req);
  // If XSS middleware returns an error response (non-200 status), stop further processing.
  if (xssResponse.status !== 200) {
    return xssResponse;
  }

  // Initialize variables to track authentication state.
  let authType: "native" | "oauth" | null = null;
  let userId: string | null = null;
  let surveyed: boolean | undefined = undefined;

  // Check if the custom native auth cookie is present.
  const nativeJwt = req.cookies.get("jwt")?.value;
  if (nativeJwt) {
    // Use your native auth function to verify the JWT.
    const nativeResult = await isNativeAuthenticated(req);
    if (nativeResult instanceof NextResponse) {
      // If native authentication fails, isNativeAuthenticated returns a redirect.
      return nativeResult;
    }
    // Successful native authentication.
    // Note: For native auth, we're only verifying the JWT. No NextAuth session is being supplied.
    userId = (nativeResult as { user: { id: string } }).user.id;
    authType = "native";
  } else {
    // No native JWT, so try to retrieve a NextAuth (OAuth) session.
    const nextAuthToken = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!nextAuthToken) {
      // No valid OAuth session—redirect to login.
      return NextResponse.redirect(new URL("/login", req.url), { status: 303 });
    }
    // For OAuth, extract the user ID and the 'surveyed' flag.
    userId = nextAuthToken?.id as string;
    surveyed = nextAuthToken?.surveyed as boolean | undefined;
    authType = "oauth";
  }

  // For OAuth users only: if the survey hasn't been completed, redirect to the survey page.
  if (authType === "oauth" && surveyed === false) {
    return NextResponse.redirect(new URL("/register/survey", req.url));
  }

  // If we reach here, authentication has passed.
  // For native auth, no session is created—you're simply verifying the token.
  // Proceed with the request.
  const response = NextResponse.next();
  if (userId) {
    response.headers.set("X-User-Id", userId);
  }
  console.log("Set ID:", userId);

  return response;
}

export const config = {
  matcher: [
    "/health/:path*",
    "/user",
    "/log/:path*",
    "/pantry/:path*",
    "/profile/:path*",
    "/recipes/:path*",
  ],
};
