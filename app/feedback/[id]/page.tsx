import React from "react";
import InterviewSummary from "@/components/InterviewDetails";
import ShowQuestionAndAnswer from "@/components/ShowQuestionAndAnswer";
import AIFeedback from "@/components/AIFeedback";
import axios from "axios";
import { generateFeedback } from "@/actions/generateFeedback";
import prisma from "@/db";
import { toast } from "sonner";

async function FeedbackPage({ params }: { params: Promise<{ id: string }> }) {
  const interviewId = (await params).id;

  let interviewData = null;
  let questionsData = null;
  let aiFeedback = "";

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/interviewDetails?interviewId=${interviewId}`
    );

    // Separate the response data
    interviewData = response.data?.interviewDetails;
    questionsData = response.data?.questionAndAnswers;

    const aiFeedbackExists = await prisma.feedback.findFirst({
      where: {
        interviewId: interviewId,
      },
    });
    if (aiFeedbackExists) {
      aiFeedback = aiFeedbackExists.feedback;
    } else if (interviewData && questionsData) {
      // If no existing feedback, generate new feedback
      aiFeedback = await generateFeedback(interviewData, questionsData);

      if (aiFeedback) {
        // Save the generated feedback to the database
        const saveFeedback = await prisma.feedback.create({
          data: {
            interviewId: interviewId as string,
            feedback: aiFeedback,
          },
        });
        console.log("Feedback saved successfully", saveFeedback);
      } else {
        toast.error("Error generating feedback");
      }
    }

    console.log("Interview Data:", interviewData);
    console.log("Questions Data:", questionsData);
    console.log("AI Feedback:", aiFeedback);
  } catch (error) {
    console.log(
      "Error fetching interview details or generating feedback:",
      error
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Your Interview Summary</h1>
        <a
          href="/dashboard"
          className="text-primary hover:underline text-lg font-medium">
          Back to Dashboard
        </a>
      </div>

      {/* Main Content */}
      <InterviewSummary interviewDetails={interviewData} />
      <AIFeedback feedback={aiFeedback} />
      <ShowQuestionAndAnswer questionAndAnswers={questionsData} />
    </div>
  );
}

export default FeedbackPage;
