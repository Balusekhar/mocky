import React from "react";
import InterviewSummary from "@/components/InterviewDetails";
import ShowQuestionAndAnswer from "@/components/ShowQuestionAndAnswer";
import AIFeedback from "@/components/AIFeedback";
import axios from "axios";
import { generateFeedback } from "@/actions/generateFeedback";

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

    if (interviewData && questionsData) {
      aiFeedback = await generateFeedback(interviewData, questionsData);
    }

    console.log("Interview Data:", interviewData);
    console.log("Questions Data:", questionsData);
    console.log("AI Feedback:", aiFeedback);
  } catch (error) {
    console.error(
      "Error fetching interview details or generating feedback:",
      error
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <InterviewSummary interviewDetails={interviewData} />
      <AIFeedback feedback={aiFeedback} />
      <ShowQuestionAndAnswer questionAndAnswers={questionsData} />
    </div>
  );
}

export default FeedbackPage;
