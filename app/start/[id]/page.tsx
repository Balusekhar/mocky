"use client";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import Timer from "../../../components/Timer";
import axios from "axios";
import { CardHeader } from "@/components/ui/card";
import Webcam from "react-webcam";
import { Camera } from "lucide-react";

const QuestionLayout = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [start, setStart] = useState(false);
  const [webcamEnabled, setWebcamEnabled] = useState(true);

  const params = useParams<{ id: string }>();

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!params.id) return;

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
  }, [params.id]);

  const handleStart = () => {
    setStart(true);
  };

  const handleSkip = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
    setStart(false);
  };

  const handleTimerComplete = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
    setStart(false);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Middle Container */}
      <div className="w-[60%] h-[95%] bg-white rounded-lg shadow-lg flex flex-col p-6 border border-gray-200">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Question {currentIndex + 1}
          </h2>
          <Badge
            variant="outline"
            className="text-sm px-4 py-1 bg-blue-50 text-blue-700 border-blue-300 rounded-full">
            {questions.length > 0
              ? `${currentIndex + 1} of ${questions.length}`
              : "Loading..."}
          </Badge>
        </div>

        {/* Question Text */}
        <div className="text-lg font-bold text-center mb-6 bg-blue-50 px-6 py-4 rounded-md shadow">
          <CardHeader>
            {questions.length > 0
              ? questions[currentIndex]?.questionText
              : "Loading question..."}
          </CardHeader>
        </div>

        {/* Block Area */}
        {/* Block Area with Webcam */}
        <div className="relative flex-1 flex items-center justify-center bg-gray-100 rounded-md mb-6 border border-gray-300 shadow-inner overflow-hidden">
          {webcamEnabled ? (
            <Webcam mirrored={true} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <Camera className="h-16 w-16 text-gray-400" />
              <p className="text-gray-600 mt-2">Camera is off</p>
            </div>
          )}
          {/* Camera Toggle Button */}
          <Button
            onClick={() => setWebcamEnabled((prev) => !prev)}
            variant="ghost"
            size="icon"
            className="absolute bottom-4 right-4 bg-white shadow-md rounded-full p-2 hover:bg-gray-200">
            {webcamEnabled ? (
              <Camera className="h-6 w-6 text-green-500" />
            ) : (
              <Camera className="h-6 w-6 text-gray-400" />
            )}
          </Button>
        </div>

        {/* Buttons and Timer */}
        <div className="flex justify-between items-center gap-6">
          {/* Start Button */}
          <Button
            disabled={start}
            onClick={handleStart}
            className="w-1/3 bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-md shadow-sm transition duration-200">
            Start
          </Button>

          {/* Timer in the Center */}
          <div className="w-1/3 flex justify-center pe-8 text-2xl font-semibold text-gray-800">
            <Timer
              durationinMillis={180000}
              onComplete={handleTimerComplete}
              start={start}
            />
          </div>

          {/* Skip Button */}
          <Button
            onClick={handleSkip}
            variant="outline"
            className="w-1/3 border-gray-300 text-gray-700 hover:bg-secondary hover:text-secondary-foreground font-medium py-2 rounded-md shadow-sm transition duration-200">
            {start ? "Next" : "Skip"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionLayout;
