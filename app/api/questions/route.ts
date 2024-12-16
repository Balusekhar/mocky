import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(req: NextRequest) {
  try {
    const interviewId = req.nextUrl.searchParams.get("interviewId");

    if (!interviewId) {
      return NextResponse.json(
        { error: "interviewId is required" },
        { status: 400 }
      );
    }

    const questions = await prisma.question.findMany({
      where: {
        interviewId: interviewId,
      },
    });

    return NextResponse.json({ questions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching questions" },
      { status: 500 }
    );
  }
}
