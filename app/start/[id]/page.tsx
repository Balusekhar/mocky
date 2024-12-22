"use client";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

// Dynamically import the QuestionLayout component, with ssr: false to disable SSR
const QuestionLayoutWithNoSSR = dynamic(
  () => import("@/components/QuestionLayout"),
  {
    ssr: false,
  }
);

const InterviewPage = () => {
  const params = useParams<{ id: string }>(); // Get the `id` from the URL params

  return (
    <div>
      {/* Render the dynamically loaded component, passing `id` as a prop */}
      <QuestionLayoutWithNoSSR interviewId={params.id} />
    </div>
  );
};

export default InterviewPage;
