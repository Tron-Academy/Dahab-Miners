import { useState, useEffect } from "react";
import { getTimeElapsed } from "../utils/timeFunction";

export default function useTimeElapsed(isoDateString) {
  const [timeElapsed, setTimeElapsed] = useState(getTimeElapsed(isoDateString));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(getTimeElapsed(isoDateString));
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [isoDateString]);

  return { timeElapsed };
}
