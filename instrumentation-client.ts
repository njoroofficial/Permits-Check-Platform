import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (!posthogKey || posthogKey.trim() === "") {
  console.error(
    "ERROR: NEXT_PUBLIC_POSTHOG_KEY is not defined or is empty. " +
      "PostHog analytics will not be initialized. " +
      "Please set NEXT_PUBLIC_POSTHOG_KEY in your environment variables."
  );
} else {
  posthog.init(posthogKey, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2025-05-24",
    capture_exceptions: true, // This enables capturing exceptions using Error Tracking, set to false if you don't want this
    debug: process.env.NODE_ENV === "development",
  });
}
