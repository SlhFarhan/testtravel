import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Rute Nusa — kembali ke beranda"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:-rotate-3",
          tone === "dark" ? "bg-ink text-paper" : "bg-paper text-ink",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-[22px]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M4.5 20v-9.5A3.5 3.5 0 0 1 8 7h1.5" />
          <path d="M4.5 20h4" opacity="0.4" />
          <path
            d="M15.5 3.5a4.2 4.2 0 0 1 4.2 4.2c0 3.2-4.2 6.8-4.2 6.8s-4.2-3.6-4.2-6.8a4.2 4.2 0 0 1 4.2-4.2Z"
            fill="currentColor"
            stroke="none"
          />
          <circle
            cx="15.5"
            cy="7.7"
            r="1.5"
            className={tone === "dark" ? "fill-ink" : "fill-paper"}
            stroke="none"
          />
        </svg>
      </span>
      <span className="flex flex-col">
        <span
          className={cn(
            "font-display text-[1.2rem] leading-none font-semibold tracking-[-0.02em]",
            tone === "dark" ? "text-ink" : "text-paper",
          )}
        >
          Rute Nusa
        </span>
        <span
          className={cn(
            "mt-1 text-[9px] leading-none font-semibold tracking-[0.26em] uppercase",
            tone === "dark" ? "text-ink/45" : "text-paper/45",
          )}
        >
          Travel antar kota
        </span>
      </span>
    </Link>
  );
}
