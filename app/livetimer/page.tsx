"use client";
// import { useEffect, useState } from "react";
// import { Clock } from "lucide-react";

// type LiveTimerProps = {
//   startTime: string; // ISO string
//   duration: { days?: number; hours?: number; minutes?: number };
//   time?: string;
// };

// function getEndDate(start: Date, duration: { days?: number; hours?: number; minutes?: number }) {
//   const end = new Date(start);
//   if (duration.days) end.setDate(end.getDate() + duration.days);
//   if (duration.hours) end.setHours(end.getHours() + duration.hours);
//   if (duration.minutes) end.setMinutes(end.getMinutes() + duration.minutes);
//   return end;
// }

// function formatDuration(ms: number) {
//   const totalSeconds = Math.floor(ms / 1000);
//   const hours = Math.floor(totalSeconds / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);
//   const seconds = totalSeconds % 60;

//   return `${hours > 0 ? hours + "h " : ""}${minutes}m ${seconds}s`;
// }

// export default function LiveTimer({ startTime, duration }: LiveTimerProps) {
//   const [label, setLabel] = useState("");
//   const [timeText, setTimeText] = useState("");

//   useEffect(() => {
//     if (!startTime) return;

//     const start = new Date(startTime);
//     const end = getEndDate(start, duration);

//     function update() {
//       const now = new Date();

//       if (now < start) {
//         setLabel("Starts in");
//         setTimeText(formatDuration(start.getTime() - now.getTime()));
//       } else if (now >= start && now < end) {
//         setLabel("Ends in");
//         setTimeText(formatDuration(end.getTime() - now.getTime()));
//       } else {
//         setLabel("Ended");
//         setTimeText(""); // Or time ago logic if needed
//       }
//     }

//     update(); // initial run
//     const interval = setInterval(update, 1000);

//     return () => clearInterval(interval);
//   }, [startTime, duration]);

//   if (!label) return null;

//   return (
//     <span className="font-semibold text-base text-red-600 flex items-center gap-1">
//       <Clock className="h-3 w-3" />
//      {timeText}
//     </span>
//   );
// }
import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react"; // optional — replace with your icon

type Duration = { days?: number; hours?: number; minutes?: number };

export interface LiveTimerProps {
  /** If you pass `time`, it's treated as the *start time* to count down to. */
  time?: string;
  /** Alternatively, pass a start time plus duration so component can show Starts / Ends countdown. */
  startTime?: string;
  duration?: Duration;
  /** Optional small label prefix (e.g. "Starts In" / "Ends In"). */
  showPrefix?: boolean;
  className?: string;
}

/** helpers */
function getEndDate(start: Date, duration: Duration) {
  const end = new Date(start);
  if (duration.days) end.setDate(end.getDate() + duration.days);
  if (duration.hours) end.setHours(end.getHours() + duration.hours);
  if (duration.minutes) end.setMinutes(end.getMinutes() + duration.minutes);
  return end;
}

// function formatDuration(ms: number) {
//   const totalSeconds = Math.floor(ms / 1000);
//   const hours = Math.floor(totalSeconds / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);
//   const seconds = totalSeconds % 60;
//   return `${hours > 0 ? hours + "h " : ""}${minutes}m ${seconds}s`;
// }
 function formatDuration(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let str = "";
    if (days > 0) str += `${days}d `;
    if (hours > 0 || days > 0) str += `${hours}h `;
    str += `${minutes}m ${seconds}s`;
    return str;
  }
/** Component */
export default function LiveTimer({
  time,
  startTime,
  className ,
  duration,
  showPrefix = false,
}: LiveTimerProps) {
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    function update() {
      const now = new Date();

      // Case A: direct start time provided via `time` -> countdown to start
      if (time) {
        const start = new Date(time);
        const diff = start.getTime() - now.getTime();
        if (diff > 0) {
          setLabel(`${showPrefix ? "Starts in " : ""}${formatDuration(diff)}`);
        } else {
          setLabel("Starting Now");
        }
        return;
      }

      // Case B: startTime + duration provided -> robust behaviour
      if (startTime && duration) {
        const start = new Date(startTime);
        const end = getEndDate(start, duration);

        if (now < start) {
          // Before auction: countdown to start
          const diff = start.getTime() - now.getTime();
          setLabel(`${showPrefix ? "Starts in " : ""}${formatDuration(diff)}`);
        } else if (now >= start && now < end) {
          // During auction: countdown to end
          const diff = end.getTime() - now.getTime();
          setLabel(`${showPrefix ? "Ends in " : ""}${formatDuration(diff)}`);
        } else {
          // After end
          setLabel("Ended");
        }
        return;
      }

      // No usable props — hide component
      setLabel("");
    }

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [time, startTime, duration, showPrefix, className]);

  if (!label) return null;

  const isLive = label === "Starting Now" || label.startsWith("Ends in");
 

  return (
    <span className={`font-semibold flex items-center gap-1 text-sm ${className || "text-red-600"}`}>
      <Clock className="h-3 w-3" />
      {label}
    </span>
  );
}

export { LiveTimer };

