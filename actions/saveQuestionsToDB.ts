"use server";
import prisma from "@/db";
import { auth } from "../auth";

type InterviewDetails = {
  topic: string;
  role: string;
  yearsOfExperience: string;
  duration: string;
};

interface Question {
  question: string; // The question text generated by the AI
  answer: string; // The correct answer provided by the AI
}

export async function saveQuestionsToDB(
  generateQuestions: any, // Change to an array of Question
  interviewDetails: InterviewDetails,
  interviewId: string
) {
  const session = await auth();
  console.log("interviewId", interviewId);
  console.log("session", session);
  console.log("session?.user?.id", session?.user?.id);
  if (!session?.user?.id) throw new Error("User is not authenticated");

  const parsedQuestions = JSON.parse(generateQuestions);
  console.log("parsed questions", parsedQuestions);
  console.log("Type of parsedQuestions:", typeof parsedQuestions); // Should be 'object' for arrays
  console.log("Is Array?", Array.isArray(parsedQuestions)); // Should be true for arrays
  console.log("interviewId in saveQuestionsInDB", interviewId);

  const interviewData = await prisma.interview.create({
    data: {
      id: interviewId,
      topic: interviewDetails.topic,
      role: interviewDetails.role,
      experience: interviewDetails.yearsOfExperience,
      duration: Number(interviewDetails.duration),
      userId: session.user.id,
      questions: {
        create: parsedQuestions.map((q: any) => ({
          questionText: q.question,
          correctAnswer: q.answer, // Ensure "answer" field is used
        })),
      },
    },
    include: {
      questions: true,
    },
  });

  console.log("Interview and questions saved:", interviewData);
  return interviewData;
}
