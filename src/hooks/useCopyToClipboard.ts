import { useEffect, useRef, useState } from "react";

export type CopyStatus = "idle" | "copied" | "failed";

// How long "Copied" and "Link copied" show (plan section 3.3).
export const COPIED_DURATION_MS = 2000;

// The Clipboard code that CopyButton and SectionHeading share (plan section 3.5).
// "copied" returns to "idle" after 2 seconds. "failed" stays until the next attempt, so
// the reader sees why the text is not on the clipboard.
export function useCopyToClipboard() {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timer = useRef<number | undefined>(undefined);

  // Stops the timer if the component goes away while "Copied" shows.
  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Returns whether the text reached the clipboard.
  async function copy(text: string): Promise<boolean> {
    window.clearTimeout(timer.current);

    try {
      // navigator.clipboard is missing on an insecure page, which also lands in catch.
      await navigator.clipboard.writeText(text);
    } catch {
      setStatus("failed");
      return false;
    }

    setStatus("copied");
    timer.current = window.setTimeout(
      () => setStatus("idle"),
      COPIED_DURATION_MS,
    );
    return true;
  }

  return { status, copy };
}
