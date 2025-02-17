import { NextRequest, NextResponse } from "next/server";
import xss from "xss";

/**
 * Recursively sanitizes an object (or array) by applying XSS filtering to string values.
 *
 * @param obj - The object or array to sanitize.
 * @returns The sanitized object or array.
 */
export function sanitize<T>(obj: T): T {
  const options = {
    whiteList: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: ["script"],
  };

  if (Array.isArray(obj)) {
    return obj.map((item) =>
      typeof item === "object" && item !== null
        ? sanitize(item)
        : typeof item === "string"
        ? xss(item, options)
        : item
    ) as unknown as T;
  }

  if (obj !== null && typeof obj === "object") {
    const sanitizedObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (typeof value === "string") {
        sanitizedObj[key] = xss(value, options);
      } else if (typeof value === "object" && value !== null) {
        sanitizedObj[key] = sanitize(value);
      } else {
        sanitizedObj[key] = value;
      }
    }
    return sanitizedObj as T;
  }

  return obj;
}

/**
 * Middleware that validates JSON body (if present) and sanitizes headers and URL parameters.
 *
 * @param req - The NextRequest object.
 * @returns A NextResponse either continuing to the next middleware or with an error.
 */
export async function xssMiddleware(req: NextRequest) {
  try {
    // For non-GET/DELETE methods, validate that the JSON body is parseable.
    // We use req.clone() so as not to consume the original body.
    if (req.method !== "GET" && req.method !== "DELETE") {
      try {
        await req.clone().json();
      } catch (err) {
        if (err instanceof SyntaxError) {
          return NextResponse.json(
            { error: "Invalid JSON Body" },
            { status: 400 }
          );
        }
      }
    }

    // Sanitize headers.
    const sanitizedHeaders = new Headers();
    req.headers.forEach((value, key) => {
      sanitizedHeaders.set(key, xss(value));
    });

    // Sanitize URL search parameters.
    const sanitizedUrl = new URL(req.url);
    sanitizedUrl.searchParams.forEach((value, key) => {
      sanitizedUrl.searchParams.set(key, xss(value));
    });

    // Optionally, mark the request as sanitized.
    req.headers.set("x-sanitized", "true");

    return NextResponse.next();
  } catch (error) {
    console.error("Something went wrong in xss middleware:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred in XSS Middleware" },
      { status: 500 }
    );
  }
}
