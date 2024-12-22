import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { questionId, userAnswer } = await req.json();

    if (!questionId || !userAnswer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const saveUserAnswer = await prisma.question.update({
      where: {
        id: questionId,
      },
      data: {
        userAnswer: userAnswer,
      },
    });

    console.log("User Answer saved successfully", saveUserAnswer);

    return NextResponse.json(
      { message: "User answer saved successfully", saveUserAnswer },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving user answer:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
