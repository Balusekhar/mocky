"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY as string
);

interface questionAndAnswer {
  questionText: string;
  userAnswer: string;
  correctAnswer: string;
}

interface interviewData {
  id: string;
  topic: string;
  role: string;
  experience: string;
  duration: string;
  createdAt: string;
  userId: string;
}

export const generateFeedback = async (
  interviewDetails: interviewData,
  questionData: questionAndAnswer[]
) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Generate prompt for feedback
  const prompt = `
    Interview Topic: ${interviewDetails.topic}
    Candidate Role: ${interviewDetails.role}
    Experience: ${interviewDetails.experience} years
    Interview Duration: ${interviewDetails.duration} minutes
    
    Based on the user's answers to the following questions, provide constructive feedback:
    
    ${questionData
      .map(
        (data, index) => `
        Question ${index + 1}: ${data.questionText}
        User Answer: ${data.userAnswer}
        Correct Answer: ${data.correctAnswer}
      `
      )
      .join("\n")}
      
    The feedback should be concise (4-5 lines), focusing on the user's understanding, areas of strength, and areas for improvement. Be constructive and encourage further learning and practice.
  `;

  // Generate feedback using the model
  const result = await model.generateContent(prompt);
  console.log("AI Feedback", result.response.text());
  const feedBack = result.response.text();
  return feedBack;
};
