import { NextRequest, NextResponse } from "next/server";
import xss from "xss";

// recursive sanitization function with generic typing
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
  const sanitizedHeaders = new Headers();
  req.headers.forEach((value, key) => {
    sanitizedHeaders.set(key, xss(value));
  });

  const sanitizedUrl = new URL(req.url);
  sanitizedUrl.searchParams.forEach((value, key) => {
    sanitizedUrl.searchParams.set(key, xss(value));
  });

  let body;
  // Safely handle non-existent or invalid body
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

  const sanitizedRequest = new Request(sanitizedUrl, {
    headers: sanitizedHeaders,
    method: req.method,
    body: body ? JSON.stringify(body) : undefined,
  });

  return NextResponse.next({
    request: sanitizedRequest,
  });
}
