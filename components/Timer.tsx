"use client";
import React, { useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { CircleDot } from "lucide-react"; // Import recording icon

function Timer({
  durationinMillis,
  timerEndTime,
  onComplete,
  start,
}: {
  durationinMillis: number;
  timerEndTime: number | null; // Accept the fixed end time
  onComplete: () => void;
  start: Boolean;
}) {
  const renderer = ({ minutes, seconds }: CountdownRenderProps) => (
    <div className="flex items-center justify-center space-x-2 text-3xl font-semibold">
      <CircleDot className="text-red-600 animate-pulse" />
      <span className="text-gray-800">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );

  return (
    <div className="w-full text-center">
      {start && timerEndTime && (
        <Countdown
          date={timerEndTime} // Use the fixed end time
          onComplete={onComplete}
          renderer={renderer}
        />
      )}
    </div>
  );
}


export default Timer;
