import { NextRequest } from "next/server";

export default async function parseBody(req: NextRequest) {
  return await req.json();
}
