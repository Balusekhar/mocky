"use client";
import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { CardHeader } from "@/components/ui/card";
import Webcam from "react-webcam";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import Timer from "./Timer";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useRouter } from "next/navigation";

type QuestionLayoutProps = {
  interviewId: string;
};

const QuestionLayout = ({ interviewId }: QuestionLayoutProps) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionsFetched, setQuestionsFetched] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [start, setStart] = useState(false);
  const [webcamEnabled, setWebcamEnabled] = useState(true);
  const [timerEndTime, setTimerEndTime] = useState<number | null>(null);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const {
    transcript,
    listening,
    isMicrophoneAvailable,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const router = useRouter();

  useEffect(() => {
    if (!questionsFetched || questions.length === 0) return;

    // Only route when we've completed all questions
    if (currentIndex >= questions.length) {
      console.log("All questions completed, routing to feedback...");
      router.replace(`/feedback/${interviewId}`);
    }
  }, [currentIndex, questions, questionsFetched, interviewId, router]);

  const startListen = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListen = () => {
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    console.log("isMicrophoneAvailable", isMicrophoneAvailable);
    const fetchQuestions = async () => {
      if (!interviewId) return;

      try {
        const response = await axios.get(
          `/api/questions?interviewId=${interviewId}`
        );
        setQuestions(response.data.questions);
        if (response.data.questions.length > 0) {
          setCurrentQuestionId(response.data.questions[0].id);
        }
        console.log("Fetched Questions:", response.data.questions);
        setQuestionsFetched(true);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [interviewId]);

  const handleStart = async () => {
    try {
      //   const stream = await navigator.mediaDevices.getUserMedia({
      //     video: true,
      //   });

      if (!isMicrophoneAvailable) {
        toast.error("Enable the microphone before starting the interview");
        return;
      }

      startListen();
      // Set the timer's end time
      setTimerEndTime(Date.now() + 180000); // 3 minutes from now
      setStart(true);
    } catch (error) {
      toast.error("Enable the webcam before starting the interview");
    }
  };

  const saveUserAnswerToPrisma = async () => {
    console.log("questionId in saveanswerinPrisma", currentQuestionId);

    try {
      if (!currentQuestionId) {
        toast.error(
          "Transcript is Missing. Make sure to turn on the Microphone"
        );
        console.log("Missing question ID or transcript.");
        return;
      }
      const response = await axios.post("/api/answers", {
        questionId: currentQuestionId,
        userAnswer: transcript || "",
      });

      if (response.status === 200) {
        console.log("Answer saved successfully:", response.data);
        toast.success("Answer saved successfully!");
        return response;
      }
    } catch (error) {
      console.error("Error saving user answer:", error);
      toast.error("Failed to save the answer. Please try again.");
    }
  };

  const handleSkip = async () => {
    stopListen();
    // Save the combined transcript to Prisma
    try {
      const response = await saveUserAnswerToPrisma();
      if (response && response.status === 200) {
        resetTranscript();
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setStart(false);
        setCurrentQuestionId(questions[currentIndex + 1]?.id || null);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const handleTimerComplete = async () => {
    try {
      const response = await saveUserAnswerToPrisma();
      if (response && response.status === 200) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setStart(false);
        setCurrentQuestionId(questions[currentIndex + 1]?.id || null);
        setTimerEndTime(null);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  if (!browserSupportsSpeechRecognition) {
    toast.error("Browser doesn't support speech recognition.");
    return;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Middle Container */}
      <div className="w-[60%] h-[95%] bg-white rounded-lg shadow-lg flex flex-col p-6 border border-gray-200">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-800">
              Question {currentIndex + 1}
            </h2>
            {listening && (
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-sm px-4 py-1 bg-green-50 text-green-700 border-green-300 rounded-full">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                Recording
              </Badge>
            )}
          </div>
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

        {/* Webcam Section */}
        <div className="relative flex-1 flex items-center justify-center bg-gray-100 rounded-md mb-6 border border-gray-300 shadow-inner overflow-hidden">
          {webcamEnabled ? (
            <Webcam mirrored={true} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <Camera className="h-16 w-16 text-gray-400" />
              <p className="text-gray-600 mt-2">Camera is off</p>
            </div>
          )}
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
          <Button
            disabled={start}
            onClick={handleStart}
            className="w-1/3 bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-md shadow-sm transition duration-200">
            Start
          </Button>

          <div className="w-1/3 flex justify-center pe-8 text-2xl font-semibold text-gray-800">
            <Timer
              durationinMillis={180000}
              start={start}
              onComplete={handleTimerComplete}
              timerEndTime={timerEndTime}
            />
          </div>

          <Button
            onClick={handleSkip}
            variant="outline"
            className="w-1/3 border-gray-300 text-gray-700 hover:bg-secondary hover:text-secondary-foreground font-medium py-2 rounded-md shadow-sm transition duration-200">
            {start ? "Next" : "Skip"}
          </Button>
        </div>
        <div>
          <p>Microphone: {listening ? "on" : "off"}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionLayout;
