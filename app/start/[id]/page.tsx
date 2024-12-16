"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

function StartInterview() {
  const [questions, setQuestions] = useState<any[]>([]);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!params.id) return; // Ensure `id` exists before making the request

      try {
        const response = await axios.get(
          `/api/questions?interviewId=${params.id}`
        );
        setQuestions(response.data.questions);
        console.log("Fetched Questions:", response.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [params.id]); // Dependency is directly on `params.id`

  return (
    <div>
      <h1>Interview Questions</h1>
      {questions.length > 0 ? (
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              <strong>Q:</strong> {question.questionText}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}

export default StartInterview;
