import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from 'lucide-react';

function AIFeedback({ feedback }: { feedback: string }) {
  return (
    <Card className="mb-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Brain className="w-5 h-5 text-purple-500" />
          AI Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feedback || "Loading feedback..."}
        </p>
      </CardContent>
    </Card>
  );
}

export default AIFeedback;

