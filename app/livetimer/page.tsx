"use client";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

type LiveTimerProps = {
  startTime: string; // ISO string
  duration: { days?: number; hours?: number; minutes?: number };
};

function getEndDate(start: Date, duration: { days?: number; hours?: number; minutes?: number }) {
  const end = new Date(start);
  if (duration.days) end.setDate(end.getDate() + duration.days);
  if (duration.hours) end.setHours(end.getHours() + duration.hours);
  if (duration.minutes) end.setMinutes(end.getMinutes() + duration.minutes);
  return end;
}

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours > 0 ? hours + "h " : ""}${minutes}m ${seconds}s`;
}

export default function LiveTimer({ startTime, duration }: LiveTimerProps) {
  const [label, setLabel] = useState("");
  const [timeText, setTimeText] = useState("");

  useEffect(() => {
    if (!startTime) return;

    const start = new Date(startTime);
    const end = getEndDate(start, duration);

    function update() {
      const now = new Date();

      if (now < start) {
        setLabel("Starts in");
        setTimeText(formatDuration(start.getTime() - now.getTime()));
      } else if (now >= start && now < end) {
        setLabel("Ends in");
        setTimeText(formatDuration(end.getTime() - now.getTime()));
      } else {
        setLabel("Ended");
        setTimeText(""); // Or time ago logic if needed
      }
    }

    update(); // initial run
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration]);

  if (!label) return null;

  return (
    <span className="font-semibold text-base text-red-600 flex items-center gap-1">
      <Clock className="h-3 w-3" />
     {timeText}
    </span>
  );
}
