"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

const ShowQuestionAndAnswer = ({
  questionAndAnswers,
}: {
  questionAndAnswers: Array<{
    questionText: string;
    userAnswer: string;
    correctAnswer: string;
  }>;
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Review Your Answers
      </h2>
      <Accordion type="single" collapsible className="space-y-4">
        {questionAndAnswers.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border rounded-lg shadow-sm bg-card">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center gap-4 text-left">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-muted">
                  {index + 1}
                </span>
                <span className="font-medium text-base">
                  {item.questionText}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <div className="space-y-4 mt-2">
                <div
                  className={cn(
                    "p-4 rounded-lg",
                    "bg-green-50 dark:bg-green-950/20"
                  )}>
                  <div className="flex items-start gap-2">
                    <div>
                      <h4 className="font-semibold text-xl mb-2">
                        Your Answer
                      </h4>
                      <p className="text-base text-black text-muted-foreground">
                        {item.userAnswer}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-secondary">
                  <h4 className="font-semibold text-xl mb-2">Answer by AI</h4>
                  <p className="text-base text-black text-muted-foreground">
                    {item.correctAnswer}
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ShowQuestionAndAnswer;
