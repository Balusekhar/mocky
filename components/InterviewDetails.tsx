import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { format } from "date-fns";

const InterviewDetails = ({ interviewDetails }: { interviewDetails: any }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Interview Summary</CardTitle>
        <CardDescription>
          Completed on{" "}
          {format(new Date(interviewDetails.createdAt), "MMMM d, yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Topic</p>
            <p className="text-lg font-semibold">{interviewDetails.topic}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Role</p>
            <p className="text-lg font-semibold">{interviewDetails.role}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Experience
            </p>
            <p className="text-lg font-semibold">
              {interviewDetails.experience} years
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Duration
            </p>
            <p className="text-lg font-semibold">
              {interviewDetails.duration} minutes
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewDetails;
