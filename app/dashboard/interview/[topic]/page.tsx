"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Webcam from "react-webcam";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera, Info, TriangleAlert, Loader } from "lucide-react";
import { toast } from "sonner";
import { generateQuestions } from "@/actions/generateQuestions";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { saveQuestionsToDB } from "@/actions/saveQuestionsToDB";

export default function Component() {
  const params = useParams();
  const router = useRouter();
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  type InterviewDetails = {
    topic: string;
    role: string;
    yearsOfExperience: string;
    duration: string;
  };

  const { handleSubmit, control } = useForm<InterviewDetails>({
    defaultValues: {
      topic: params.topic as string,
      role: "",
      yearsOfExperience: "",
      duration: "",
    },
  });

  const onSubmit = async (data: InterviewDetails) => {
    if (!data.role || !data.yearsOfExperience || !data.duration) {
      toast.error("All details are required");
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (!webcamEnabled || !stream) {
      toast.error("Enable the webcam before starting the interview");
      return;
    } else {
      try {
        setLoading(true);

        // Generate questions with updated interview details
        const interviewQuestions = await generateQuestions(data);

        if (!interviewQuestions) {
          toast.error("failed to generate questions");
          return;
        }
        const interviewId = uuidv4();
        await saveQuestionsToDB(interviewQuestions, data, interviewId);
        console.log("interviewId in page.tsx", interviewId);
        await router.push(`/start/${interviewId}`);
        setLoading(false);
      } catch (e: unknown) {
        if (e instanceof Error) {
          toast.error(e.message);
          setLoading(false);
          console.log(e);
          return;
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex-1 h-full">
      <div className="h-full p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Interview Setup:
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Interview Details
              </h2>
              <p className="text-sm text-gray-500 mt-1 mb-6">
                Please provide details for your mock interview
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Job Role</Label>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="e.g. Frontend Developer" />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Controller
                    name="yearsOfExperience"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5+">5+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration of the Interview</Label>
                  <Controller
                    name="duration"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 minutes</SelectItem>
                          <SelectItem value="20">20 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <Info className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Privacy Notice
                  </h3>
                  <p className="text-sm text-gray-500">
                    Your video feed is not stored in our database. It is only
                    used for real-time interaction during the interview.
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-6 bg-black text-white hover:bg-gray-800">
                {loading ? (
                  <div className="flex justify-center items-center space-x-2">
                    <Loader className="animate-spin h-5 w-5" />
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Video Preview
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setWebcamEnabled(!webcamEnabled)}
                className="text-gray-500 hover:text-gray-700">
                {webcamEnabled ? (
                  <Camera className="h-6 w-6" />
                ) : (
                  <TriangleAlert className="h-32 w-32 text-red-600" />
                )}
              </Button>
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              {webcamEnabled ? (
                <Webcam mirrored={true} className="w-full" />
              ) : (
                <Camera className="h-12 w-12 text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
