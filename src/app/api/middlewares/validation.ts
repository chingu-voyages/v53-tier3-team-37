import { NextRequest, NextResponse } from "next/server";
import { ZodTypeAny } from "zod";
import * as schemas from "./schemas";
import parseBody from "../utils/parseBody";

export const validateQueryParam = (key: string, schema: ZodTypeAny) => {
  return async (req: NextRequest) => {
    const value = req.nextUrl.searchParams.get(key);
    const result = schema.safeParse(value);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation Error", issues: result.error.issues },
        { status: 400 }
      );
    }

    const response = NextResponse.next();
    response.headers.set(`x-validated-${key}`, JSON.stringify(result.data));
    return response;
  };
};

export const validateBody = (schema: ZodTypeAny) => {
  return async (req: NextRequest) => {
    let body;
    try {
      body = await parseBody(req);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid JSON Body", err },
        { status: 400 }
      );
    }

    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation Error", issues: result.error.issues },
        { status: 400 }
      );
    }

    const response = NextResponse.next();
    response.headers.set("x-validated-body", JSON.stringify(result.data));

    return response;
  };
};

export const setDefault = (key: string, defaultValue: string) => {
  return async (req: NextRequest) => {
    let body;

    try {
      body = await parseBody(req);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid JSON Body:", details: err },
        { status: 400 }
      );
    }

    if (body[key] === undefined) {
      body[key] = defaultValue;
    }
    const response = NextResponse.next();
    response.headers.set("x-default-body", JSON.stringify(body));
    return response;
  };
};

export const createUser = validateBody(schemas.Account);
export const login = validateBody(schemas.Login);
export const updateUser = validateBody(schemas.UserUpdate);
export const createFavorite = validateBody(schemas.Favorite);
