import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { Shell } from "@/components/ui";

type Crumb = { name: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line/70">
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-full text-ink/[0.06] opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 size-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(201,79,39,0.12),transparent_65%)]"
      />

      <Shell className="relative py-10 sm:py-14 lg:py-16">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-ink/40"
        >
          <Link href="/" className="transition-colors hover:text-ink">
            Beranda
          </Link>
          {breadcrumbs.map((crumb) => (
            <span key={crumb.name} className="flex items-center gap-2">
              <ArrowRightIcon
                aria-hidden
                className="size-3 text-ink/25"
              />
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-ink"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink/60">
                  {crumb.name}
                </span>
              )}
            </span>
          ))}
        </nav>

        <div className="mt-7 grid gap-9 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-12">
          <div>
            {eyebrow ? (
              <p className="eyebrow text-clay">
                <span aria-hidden className="h-px w-6 bg-clay/60" />
                {eyebrow}
              </p>
            ) : null}
            <h1 className="mt-4 font-display text-[clamp(2.15rem,4.6vw,3.35rem)] leading-[1.03] font-medium tracking-[-0.03em]">
              {title}
            </h1>
            {description ? (
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink/60">
                {description}
              </p>
            ) : null}
          </div>
          {children ? <div className="lg:justify-self-end">{children}</div> : null}
        </div>
      </Shell>
    </section>
  );
}
