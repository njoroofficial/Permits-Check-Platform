import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get relative time string (e.g., "3 days ago", "just now", "in 5 minutes")
 */
export function getRelativeTime(date: Date | string): string {
  const targetDate = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - targetDate.getTime()) / 1000
  );

  // Handle future dates
  if (diffInSeconds < 0) {
    const absDiff = Math.abs(diffInSeconds);

    if (absDiff < 60) return "in a few seconds";
    if (absDiff < 3600) {
      const minutes = Math.floor(absDiff / 60);
      return `in ${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
    }
    if (absDiff < 86400) {
      const hours = Math.floor(absDiff / 3600);
      return `in ${hours} ${hours === 1 ? "hour" : "hours"}`;
    }
    if (absDiff < 2592000) {
      const days = Math.floor(absDiff / 86400);
      return `in ${days} ${days === 1 ? "day" : "days"}`;
    }
    if (absDiff < 31536000) {
      const months = Math.floor(absDiff / 2592000);
      return `in ${months} ${months === 1 ? "month" : "months"}`;
    }
    const years = Math.floor(absDiff / 31536000);
    return `in ${years} ${years === 1 ? "year" : "years"}`;
  }

  // Handle past dates
  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }
  if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
  if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  }
  const years = Math.floor(diffInSeconds / 31536000);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
}
