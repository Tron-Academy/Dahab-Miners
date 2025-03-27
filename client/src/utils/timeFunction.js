export function getTimeElapsed(isoDateString) {
  // Parse the input date
  const pastDate = new Date(isoDateString);
  const currentDate = new Date();

  // Calculate difference in milliseconds
  const diffInMs = currentDate - pastDate;

  // Calculate individual units
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // Calculate remainders
  const hours = diffInHours % 24;
  const minutes = diffInMinutes % 60;
  const seconds = diffInSeconds % 60;

  return {
    days: diffInDays,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    totalHours: Math.floor(diffInMs / (1000 * 60 * 60)), // Total hours including days
    totalMinutes: Math.floor(diffInMs / (1000 * 60)), // Total minutes including days/hours
    totalSeconds: diffInSeconds, // Total seconds
  };
}

// Human-readable format
export function formatTimeElapsed(elapsed) {
  if (elapsed.days > 0) {
    return `${elapsed.days} day${elapsed.days > 1 ? "s" : ""} `;
  }
  if (elapsed.hours > 0) {
    return `${elapsed.hours} hour${elapsed.hours > 1 ? "s" : ""} `;
  }
  if (elapsed.minutes > 0) {
    return `${elapsed.minutes} minute${elapsed.minutes > 1 ? "s" : ""} `;
  }
  return `${elapsed.seconds} second${elapsed.seconds !== 1 ? "s" : ""} `;
}
