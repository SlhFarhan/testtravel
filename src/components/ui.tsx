import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { waLink } from "@/lib/site";
import { ArrowUpRightIcon, StarIcon, WhatsAppIcon } from "@/components/icons";

export function Shell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("shell", className)}>{children}</div>;
}

const buttonVariants = {
  clay: "bg-clay text-white shadow-[0_14px_30px_-14px_rgba(158,58,27,0.85)] hover:bg-clay-deep",
  ink: "bg-ink text-paper hover:bg-ink-2",
  outline:
    "border border-ink/20 text-ink hover:border-ink/45 hover:bg-ink/[0.04]",
  light: "bg-paper text-ink hover:bg-white",
  outlineLight:
    "border border-paper/30 text-paper hover:border-paper/60 hover:bg-paper/10",
} as const;

const buttonSizes = {
  sm: "h-9 gap-2 px-4 text-[13px]",
  md: "h-11 gap-2.5 px-5 text-sm",
  lg: "h-[3.25rem] gap-2.5 px-6 text-[15px]",
} as const;

type ButtonStyle = keyof typeof buttonVariants;
type ButtonSize = keyof typeof buttonSizes;

export function WhatsAppButton({
  message,
  children = "Pesan via WhatsApp",
  variant = "clay",
  size = "md",
  className,
  showIcon = true,
}: {
  message?: string;
  children?: ReactNode;
  variant?: ButtonStyle;
  size?: ButtonSize;
  className?: string;
  showIcon?: boolean;
}) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
    >
      {showIcon ? (
        <WhatsAppIcon className="size-[1.15em] shrink-0 opacity-95" />
      ) : null}
      <span>{children}</span>
    </a>
  );
}

export function LinkButton({
  href,
  children,
  variant = "outline",
  size = "md",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonStyle;
  size?: ButtonSize;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
  className,
  tone = "dark",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-semibold",
        tone === "dark" ? "text-ink hover:text-clay" : "text-paper hover:text-white",
        className,
      )}
    >
      <span className="link-underline">{children}</span>
      <ArrowUpRightIcon className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "eyebrow mb-4",
            tone === "dark" ? "text-clay" : "text-gold",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "h-px w-6",
              tone === "dark" ? "bg-clay/60" : "bg-gold/60",
            )}
          />
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.1] font-medium tracking-[-0.02em]",
          tone === "dark" ? "text-ink" : "text-paper",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-[15px] leading-relaxed sm:text-base",
            tone === "dark" ? "text-ink/65" : "text-paper/65",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Stars({
  value = 5,
  className,
  size = "size-3.5",
}: {
  value?: number;
  className?: string;
  size?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-0.5 text-gold", className)}
      role="img"
      aria-label={`${value} dari 5 bintang`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon
          key={index}
          className={cn(size, index < Math.round(value) ? "" : "opacity-25")}
        />
      ))}
    </span>
  );
}

export function Pill({
  children,
  tone = "paper",
  className,
}: {
  children: ReactNode;
  tone?: "paper" | "dark" | "clay" | "green";
  className?: string;
}) {
  const tones = {
    paper: "border-line bg-white/70 text-ink/70",
    dark: "border-paper/15 bg-paper/5 text-paper/80",
    clay: "border-clay/20 bg-clay-soft/60 text-clay-deep",
    green: "border-sage/20 bg-sage-soft text-sage",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
