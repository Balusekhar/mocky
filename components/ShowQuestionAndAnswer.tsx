"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuestionAnswer {
  id: string;
  questionText: string;
  userAnswer: string;
  correctAnswer: string;
}

const ShowQuestionAndAnswer = ({
  questionAndAnswers,
}: {
  questionAndAnswers: QuestionAnswer[];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Review Your Answers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-2">
          {questionAndAnswers.map((item, index) => (
            <AccordionItem
              key={item.id || index}
              value={`item-${index}`}
              className="border rounded-lg shadow-sm bg-card">
              <AccordionTrigger className="px-4 py-2 hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium text-sm">
                    {index + 1}
                  </span>
                  <span className="font-medium text-sm line-clamp-1">
                    {item.questionText}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4 mt-2">
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                    <h4 className="font-medium text-sm mb-2">Your Answer</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.userAnswer}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/50">
                    <h4 className="font-medium text-sm mb-2">Model Answer</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.correctAnswer}
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ShowQuestionAndAnswer;
