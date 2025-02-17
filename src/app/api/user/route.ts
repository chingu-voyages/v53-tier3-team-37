import { NextRequest, NextResponse } from "next/server";
import prisma from "../services/prisma";
import { verifyToken } from "../services/authService";

export async function GET(req: NextRequest) {
  const jwtCookie = req.cookies.get("jwt")?.value;

  if (!jwtCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const payload = await verifyToken(jwtCookie);

    const { id: userId } = payload as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        goals: true,
        goalTracking: {
          include: {
            food: true,
            exercise: true,
            sleep: true,
          },
        },
        healthLogs: true,
      },
    });

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (err) {
    console.error("Error Fetching User Information", err);
    return NextResponse.json({ error: "Failed to GET User" }, { status: 500 });
  }
}
