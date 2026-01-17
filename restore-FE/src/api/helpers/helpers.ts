import { type FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function getErrorMessage(error: unknown): string {
  if (!error) return "Unknown error";

  if (typeof error === "object" && error !== null && "status" in error) {
    const err = error as FetchBaseQueryError;

    if (typeof err.data === "object" && err.data !== null) {
      return (err.data as any).message ?? "Server error";
    }

    return `Request failed with status ${err.status}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error occurred";
}
