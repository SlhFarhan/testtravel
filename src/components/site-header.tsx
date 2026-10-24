"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { navLinks, site } from "@/lib/site";
import { Logo } from "@/components/logo";
import { CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { Shell, WhatsAppButton } from "@/components/ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-line bg-paper/92 backdrop-blur-md"
          : "border-transparent bg-paper/70 backdrop-blur-sm",
      )}
    >
      <Shell className="flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors",
                    isActive(link.href)
                      ? "text-ink"
                      : "text-ink/55 hover:bg-ink/[0.04] hover:text-ink",
                  )}
                >
                  {link.label}
                  {isActive(link.href) ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-clay"
                    />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={site.phone.href}
            className="hidden items-center gap-2 text-[13px] font-medium text-ink/60 transition-colors hover:text-ink xl:flex"
          >
            <PhoneIcon className="size-4" />
            {site.phone.display}
          </a>
          <WhatsAppButton size="sm" message={undefined}>
            Pesan via WhatsApp
          </WhatsAppButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5 lg:hidden"
        >
          {open ? (
            <CloseIcon className="size-5" />
          ) : (
            <MenuIcon className="size-5" />
          )}
        </button>
      </Shell>

      <div
        id="mobile-navigation"
        hidden={!open}
        className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-paper lg:hidden"
      >
        <Shell className="py-6">
          <nav aria-label="Navigasi seluler">
            <ul className="divide-y divide-line/80">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-3.5 font-display text-xl tracking-tight transition-colors",
                      isActive(link.href) ? "text-clay" : "text-ink",
                    )}
                  >
                    {link.label}
                    <span className="text-xs font-sans font-medium tracking-normal text-ink/35">
                      {isActive(link.href) ? "Sekarang" : ""}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-6 space-y-3">
            <WhatsAppButton size="lg" className="w-full">
              Pesan via WhatsApp
            </WhatsAppButton>
            <a
              href={site.phone.href}
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-ink/15 text-sm font-semibold text-ink"
            >
              <PhoneIcon className="size-4" />
              {site.phone.display}
            </a>
          </div>

          <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-ink/50">
            <WhatsAppIcon className="mt-0.5 size-3.5 shrink-0" />
            Dibalas oleh admin manusia, setiap hari {site.hours.toLowerCase()}.
          </p>
        </Shell>
      </div>
    </header>
  );
}
