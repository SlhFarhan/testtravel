import { cn } from "@/lib/cn";

export function RouteMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 220"
      fill="none"
      aria-hidden
      className={cn("pointer-events-none", className)}
    >
      <path
        d="M18 168C92 168 84 70 158 70s76 96 148 62 56-84 96-84"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="5 8"
        strokeLinecap="round"
      />
      <circle cx="18" cy="168" r="5" fill="currentColor" />
      <circle cx="18" cy="168" r="11" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="402" cy="48" r="5" fill="currentColor" />
      <circle cx="402" cy="48" r="11" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
