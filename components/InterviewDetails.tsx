import React from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Code2, User2, Calendar } from "lucide-react";

interface InterviewDetails {
  id: string;
  topic: string;
  role: string;
  experience: string;
  duration: number;
  createdAt: string;
  userId: string;
}

const InterviewSummary = ({
  interviewDetails,
}: {
  interviewDetails: InterviewDetails;
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-500" />
            <span className="font-medium">{interviewDetails.topic}</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-2">
            <User2 className="w-4 h-4 text-purple-500" />
            <span className="font-medium">{interviewDetails.role}</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-500" />
            <span className="font-medium">
              {interviewDetails.duration} minutes
            </span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-red-500" />
            <span className="font-medium">
              {format(new Date(interviewDetails.createdAt), "MMM d, yyyy")}
            </span>
          </div>
          <Badge variant="secondary" className="ml-auto">
            {interviewDetails.experience} Experience
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewSummary;
