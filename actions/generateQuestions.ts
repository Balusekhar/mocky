"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY as string
);

interface InterviewDetails {
  topic: string;
  role: string;
  yearsOfExperience: string;
  duration: string;
}

export const generateQuestions = async (interviewDetails: InterviewDetails) => {
  console.log("interviewData in generateQuestion:", interviewDetails);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Determine the number of questions based on the interview duration
  let numberOfQuestions;
  switch (interviewDetails.duration) {
    case "10":
      numberOfQuestions = 3;
      break;
    case "20":
      numberOfQuestions = 7;
      break;
    case "30":
      numberOfQuestions = 10;
      break;
    default:
      throw new Error("Invalid interview duration");
  }

  // Create a detailed and well-defined prompt incorporating the topic
  const prompt = `
  You are an AI tasked with creating mock interview questions. Generate ${numberOfQuestions} questions for a candidate applying for the role of ${interviewDetails.role}. 
  The candidate has ${interviewDetails.yearsOfExperience} years of experience. Focus the questions on the selected topic: "${interviewDetails.topic}".
  
  Ensure the questions are relevant to the topic, and provide a variety of difficulty levels:
  - No questions should be practical (e.g.,coding tasks, or problem-solving).
  - Give importance to the selected topic and role of the candidate.
  - All questions should be conceptual (e.g., theoretical or framework-related).
  - Ask questions like a real interviewer would.
  - when giving the response, you must also give an answer. Give the correct answer for that question.
  - At least one question should assess the candidate's ability to apply their knowledge to real-world challenges.

  Format the response as a JSON array where each entry has "question" and "answer" fields. For example:
  [
    {"question": , "answer": ""},...
  ]

  Be concise, and ensure the questions are clear and unambiguous.
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean up the AI response to remove any formatting artifacts like ```json
    const cleanedResponseText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // console.log("cleanedResponseText in server action", cleanedResponseText);

    // Return the cleaned JSON response as a JavaScript object/array
    return cleanedResponseText;
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
};
