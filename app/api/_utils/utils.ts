export function logErrorResponse(error: unknown) {
  if (process.env.NODE_ENV !== "production") {
    console.error("API error:", error);
  }
}
