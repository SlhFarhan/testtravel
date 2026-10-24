import Link from "next/link";
import type { ReactNode } from "react";
import { RouteMotif } from "@/components/route-motif";
import { LinkButton, Shell, WhatsAppButton } from "@/components/ui";
import { waMessages } from "@/lib/site";

export function CtaBand({
  eyebrow = "Siap berangkat?",
  title,
  description,
  message = waMessages.general,
  secondary,
}: {
  eyebrow?: string;
  title: ReactNode;
  description: ReactNode;
  message?: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden bg-clay text-white">
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 text-white/10"
      />
      <RouteMotif className="pointer-events-none absolute -right-10 -bottom-8 hidden w-[480px] text-white/20 lg:block" />

      <Shell className="relative flex flex-col gap-8 py-14 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
        <div className="max-w-xl">
          <p className="eyebrow text-white/60">
            <span aria-hidden className="h-px w-6 bg-white/40" />
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.85rem,3.8vw,2.9rem)] leading-[1.06] font-medium tracking-[-0.02em]">
            {title}
          </h2>
          <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-white/70">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <WhatsAppButton size="lg" variant="light" message={message}>
            Chat via WhatsApp
          </WhatsAppButton>
          {secondary ? (
            <LinkButton
              href={secondary.href}
              size="lg"
              variant="outlineLight"
              className="border-white/40"
            >
              {secondary.label}
            </LinkButton>
          ) : (
            <Link
              href="/kontak"
              className="inline-flex h-[3.25rem] items-center justify-center rounded-full border border-white/40 px-6 text-[15px] font-semibold transition-all hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/10"
            >
              Hubungi kami
            </Link>
          )}
        </div>
      </Shell>
    </section>
  );
}
