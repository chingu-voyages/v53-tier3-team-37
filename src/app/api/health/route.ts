import { NextResponse } from "next/server";
import prisma from "../services/prisma"; // Adjust import based on your setup
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { calories, protein, water, date } = await req.json();

    if (calories === 0 && protein === 0 && water === 0) {
      return NextResponse.json({ message: "No data to save" }, { status: 200 });
    }

    // minor correction, so that the healthLog is created THROUGH the user on the database instead of just independently
    // may not be necessary, since we are using a NoSQL database --
    const entry = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        healthLogs: {
          create: {
            calories,
            protein,
            water,
            date: new Date(date),
          },
        },
      },
    });

    return NextResponse.json({ message: "Data saved", entry });
  } catch (error) {
    console.error("Error saving health data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
