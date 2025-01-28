import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import xss from "xss";

// recursive sanitization function with generic typing
const sanitize = <T>(obj: T): T => {
    const options = {
      whiteList: {},
      stripIgnoreTag: true,
      stripIgnoreTagBody: ["script"],
    };
  
    if (Array.isArray(obj)) {
      return obj.map((item) => (typeof item === "object" ? sanitize(item) : typeof item === "string" ? xss(item, options) : item)) as T;
    }
  
    if (typeof obj === "object" && obj !== null) {
      const sanitizedObj = { ...obj };
      for (const key in sanitizedObj) {
        const value = sanitizedObj[key as keyof typeof sanitizedObj];
        if (typeof value === "string") {
          sanitizedObj[key] = xss(value, options) as unknown as typeof sanitizedObj[typeof key];
        } else if (typeof value === "object") {
          sanitizedObj[key] = sanitize(value) as unknown as typeof sanitizedObj[typeof key];
        }
      }
      return sanitizedObj;
    }
  
    return obj;
  };

const xssMiddleware = (handler: NextApiHandler) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (req.body) {
      req.body = sanitize(req.body);
    }
    if (req.query) {
      req.query = sanitize(req.query);
    }
    return handler(req, res);
  };
};

export default xssMiddleware;