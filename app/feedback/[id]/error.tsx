"use client";
import React from "react";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function FeedbackError() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <Alert variant="destructive" className="border-2">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="text-xl font-semibold">
            Feedback Not Found
          </AlertTitle>
          <AlertDescription className="mt-2 text-sm text-muted-foreground">
            We couldn't find the feedback you're looking for. It might have been
            deleted or never existed.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <p className="text-muted-foreground">Don't worry! You can:</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
