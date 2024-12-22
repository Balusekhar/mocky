import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const interviewId = req.nextUrl.searchParams.get("interviewId");

  if (!interviewId) {
    throw new Error("InterviewId is missing");
  }

  try {
    const interviewDetails = await prisma.interview.findFirst({
      where: {
        id: interviewId,
      },
    });
    const questionAndAnswers = await prisma.question.findMany({
      where: {
        interviewId: interviewId,
      },
      select:{
        questionText:true,
        userAnswer:true,
        correctAnswer:true
      }
    });
    return NextResponse.json({
      interviewDetails: interviewDetails,
      questionAndAnswers: questionAndAnswers,
    });
  } catch (error) {
    console.log("error in feedback", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
