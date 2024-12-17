"use client";
import React, { useState } from "react";
import Countdown from "react-countdown";

function Timer({
  durationinMillis,
  onComplete,
  start,
}: {
  durationinMillis: number;
  onComplete: () => void;
  start: Boolean;
}) {
  return (
    <div className="text-xl font-semibold w-[30%] text-center">
      {start && (
        <Countdown
          date={Date.now() + durationinMillis}
          onComplete={onComplete} // Trigger the next question when the timer completes
        />
      )}
    </div>
  );
}

export default Timer;
