"use client";

import { useState, type FormEvent } from "react";
import {
  CalendarIcon,
  ChevronDownIcon,
  MapPinIcon,
  ShieldIcon,
  UsersIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { cn } from "@/lib/cn";
import { bookingMessage, cities, waLink } from "@/lib/site";

export function RouteSearch({
  defaultFrom = "Jakarta",
  defaultTo = "Bandung",
  className,
}: {
  defaultFrom?: string;
  defaultTo?: string;
  className?: string;
}) {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(2);
  const [error, setError] = useState("");

  const swap = () => {
    setFrom(to);
    setTo(from);
    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (from === to) {
      setError("Kota asal dan tujuan tidak boleh sama. Coba tukar arah.");
      return;
    }

    if (!date) {
      setError("Pilih tanggal keberangkatan terlebih dahulu.");
      return;
    }

    const chosen = new Date(`${date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (chosen < today) {
      setError("Tanggal keberangkatan sudah lewat. Pilih tanggal hari ini atau setelahnya.");
      return;
    }

    setError("");
    const url = waLink(
      bookingMessage({ from, to, date, passengers }),
    );
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border border-line bg-[#fffdf8] p-4 shadow-soft sm:p-5",
        className,
      )}
      noValidate
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] font-bold tracking-[0.14em] text-ink/40 uppercase">
          Detail perjalanan
        </p>
        <button
          type="button"
          onClick={swap}
          className="group inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-semibold text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="size-3.5 transition-transform duration-300 group-hover:rotate-180"
          >
            <path d="M4 8h13l-3-3M20 16H7l3 3" />
          </svg>
          Tukar arah
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_1.15fr_0.85fr_auto] lg:items-end">
        <div>
          <label htmlFor="route-from" className="field-label">
            Dari
          </label>
          <div className="relative">
            <MapPinIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink/35" />
            <select
              id="route-from"
              name="from"
              value={from}
              onChange={(event) => {
                setFrom(event.target.value);
                setError("");
              }}
              className="field appearance-none pr-9 pl-9"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink/35" />
          </div>
        </div>

        <div>
          <label htmlFor="route-to" className="field-label">
            Ke
          </label>
          <div className="relative">
            <MapPinIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink/35" />
            <select
              id="route-to"
              name="to"
              value={to}
              onChange={(event) => {
                setTo(event.target.value);
                setError("");
              }}
              className="field appearance-none pr-9 pl-9"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink/35" />
          </div>
        </div>

        <div>
          <label htmlFor="route-date" className="field-label">
            Tanggal
          </label>
          <div className="relative">
            <CalendarIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink/35" />
            <input
              id="route-date"
              name="date"
              type="date"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
                setError("");
              }}
              className="field pl-9"
              aria-describedby={error ? "route-search-error" : undefined}
            />
          </div>
        </div>

        <div>
          <label htmlFor="route-passengers" className="field-label">
            Penumpang
          </label>
          <div className="relative">
            <UsersIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink/35" />
            <select
              id="route-passengers"
              name="passengers"
              value={passengers}
              onChange={(event) => setPassengers(Number(event.target.value))}
              className="field appearance-none pr-8 pl-9"
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-ink/35" />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-clay px-5 text-sm font-semibold text-white shadow-[0_12px_26px_-14px_rgba(158,58,27,0.9)] transition-all hover:-translate-y-0.5 hover:bg-clay-deep active:translate-y-0 sm:col-span-2 lg:col-span-1"
        >
          <WhatsAppIcon className="size-4" />
          <span className="whitespace-nowrap">Cek jadwal</span>
        </button>
      </div>

      {error ? (
        <p
          id="route-search-error"
          role="alert"
          className="mt-3 text-xs font-medium text-clay-deep"
        >
          {error}
        </p>
      ) : null}

      <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-ink/40">
        <ShieldIcon className="mt-px size-3.5 shrink-0" />
        Tanpa akun dan tanpa pembayaran di situs ini. Detail perjalananmu
        diteruskan ke WhatsApp admin untuk dikonfirmasi.
      </p>
    </form>
  );
}
