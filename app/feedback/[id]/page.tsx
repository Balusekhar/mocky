import React from "react";
import InterviewSummary from "@/components/InterviewDetails";
import ShowQuestionAndAnswer from "@/components/ShowQuestionAndAnswer";
import axios from "axios";

async function FeedbackPage({ params }: { params: Promise<{ id: string }> }) {
  const interviewId = (await params).id;

  let interviewData = null;
  let questionsData = null;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/interviewDetails?interviewId=${interviewId}`
    );

    // Separate the response data
    interviewData = response.data?.interviewDetails;
    questionsData = response.data?.questionAndAnswers;

    console.log("Interview Data:", interviewData);
    console.log("Questions Data:", questionsData);
  } catch (error) {
    console.error("Error fetching interview details:", error);
  }
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <InterviewSummary interviewDetails={interviewData} />
      <h2 className="text-2xl font-bold mb-4">Questions and Answers</h2>
      <ShowQuestionAndAnswer questionAndAnswers={questionsData} />
    </div>
  );
}

export default FeedbackPage;
