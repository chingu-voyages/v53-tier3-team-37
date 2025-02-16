import { NextRequest, NextResponse } from "next/server";
import xss from "xss";

const options = {
  whiteList: {},
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script"],
};

// recursive sanitization function with generic typing
const sanitize = <T>(obj: T): T => {
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
      } else if (value && typeof value === "object") {
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
  console.log("Sanitizing request...");

  // Sanitize headers
  const sanitizedHeaders = new Headers();
  req.headers.forEach((value, key) => {
    sanitizedHeaders.set(key, xss(value, options));
  });

  // Sanitize URL search parameters
  const sanitizedUrl = new URL(req.url);
  sanitizedUrl.searchParams.forEach((value, key) => {
    sanitizedUrl.searchParams.set(key, xss(value, options));
  });

  let body;
  const requestInit: RequestInit = {
    headers: sanitizedHeaders,
    method: req.method,
  };

  // Only process body if method supports a body
  if (req.method !== "GET" && req.method !== "DELETE") {
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      try {
        const jsonBody = await req.json();
        body = sanitize(jsonBody);
        requestInit.body = JSON.stringify(body);
      } catch (err) {
        if (err instanceof SyntaxError) {
          return NextResponse.json(
            { error: "Invalid JSON Body" },
            { status: 400 }
          );
        }
      }
    } else if (
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      try {
        const formData = await req.formData();
        // Create a new FormData instance and sanitize string entries
        const newFormData = new FormData();
        for (const [key, value] of formData.entries()) {
          if (typeof value === "string") {
            newFormData.set(key, xss(value, options));
          } else {
            newFormData.set(key, value);
          }
        }
        body = newFormData;
        requestInit.body = body;
      } catch (err) {
        console.error("Error parsing form data:", err);
      }
    }
  }

  const sanitizedRequest = new Request(sanitizedUrl, requestInit);

  return NextResponse.next({
    request: sanitizedRequest,
  });
}
