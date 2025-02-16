import { NextRequest, NextResponse } from "next/server";
import xss from "xss";

// Recursive sanitization function with generic typing
const sanitize = <T>(obj: T): T => {
  const options = {
    whiteList: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: ["script"],
  };

  if (Array.isArray(obj)) {
    return obj.map((item) =>
      typeof item === "object"
        ? sanitize(item)
        : typeof item === "string"
        ? xss(item, options)
        : item
    ) as T;
  }

  if (typeof obj === "object" && obj !== null) {
    const sanitizedObj = { ...obj };
    for (const key in sanitizedObj) {
      const value = sanitizedObj[key as keyof typeof sanitizedObj];
      if (typeof value === "string") {
        sanitizedObj[key] = xss(
          value,
          options
        ) as unknown as (typeof sanitizedObj)[typeof key];
      } else if (typeof value === "object") {
        sanitizedObj[key] = sanitize(
          value
        ) as unknown as (typeof sanitizedObj)[typeof key];
      }
    }
    return sanitizedObj;
  }

  return obj;
};

export async function xssMiddleware(req: NextRequest) {
  try {
    // Sanitize headers
    const sanitizedHeaders = new Headers();
    req.headers.forEach((value, key) => {
      sanitizedHeaders.set(key, xss(value));
    });

    // Sanitize URL params
    const sanitizedUrl = new URL(req.url);
    sanitizedUrl.searchParams.forEach((value, key) => {
      sanitizedUrl.searchParams.set(key, xss(value));
    });

    let body;
    // Only sanitize body for non-GET and non-DELETE requests
    if (req.method !== "GET" && req.method !== "DELETE") {
      try {
        body = await req.json();
        body = sanitize(body);
      } catch (err) {
        if (err instanceof SyntaxError) {
          return NextResponse.json(
            { error: "Invalid JSON Body" },
            { status: 400 }
          );
        }
      }
    }

    // Pass sanitized request data to the next middleware
    req.headers.set("x-sanitized", "true"); // Optional: Flag for debugging or logging

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred in XSS Middleware" },
      { status: 500 }
    );
  }
}