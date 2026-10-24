import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ClockIcon,
  StarIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { cn } from "@/lib/cn";
import { formatRupiah } from "@/lib/site";

const departures = [
  {
    from: "Jakarta",
    to: "Bandung",
    time: "05.30",
    duration: "3 jam",
    status: "4 kursi",
    tone: "limited",
  },
  {
    from: "Jakarta",
    to: "Yogyakarta",
    time: "06.00",
    duration: "9 jam",
    status: "Tersedia",
    tone: "open",
  },
  {
    from: "Jakarta",
    to: "Semarang",
    time: "06.30",
    duration: "7 jam",
    status: "2 kursi",
    tone: "limited",
  },
  {
    from: "Bandung",
    to: "Yogyakarta",
    time: "07.00",
    duration: "7 jam",
    status: "Tersedia",
    tone: "open",
  },
] as const;

export function DepartureBoard() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-clay/25 via-gold/10 to-sage/25 blur-2xl"
      />

      <div className="grain relative overflow-hidden rounded-[1.75rem] bg-ink text-paper shadow-lift">
        <div className="flex items-center justify-between gap-3 border-b border-paper/10 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#25d366] opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[#25d366]" />
            </span>
            <span className="text-[10px] font-bold tracking-[0.18em] text-paper/50 uppercase">
              Papan keberangkatan
            </span>
          </div>
          <span className="rounded-full border border-paper/15 px-2.5 py-1 text-[9px] font-semibold tracking-[0.14em] text-paper/45 uppercase">
            Jadwal reguler
          </span>
        </div>

        <div className="px-5 sm:px-6">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-paper/[0.08] py-2.5 text-[9px] font-bold tracking-[0.16em] text-paper/30 uppercase">
            <span>Rute</span>
            <span className="text-right">Berangkat</span>
            <span className="w-[74px] text-right">Kursi</span>
          </div>

          {departures.map((item) => (
            <div
              key={`${item.from}-${item.to}-${item.time}`}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-paper/[0.07] py-3.5 last:border-0"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[14px] font-medium tracking-tight sm:text-[15px]">
                  <span>{item.from}</span>
                  <ArrowRightIcon className="size-3.5 text-paper/25" />
                  <span>{item.to}</span>
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[10.5px] text-paper/35">
                  <ClockIcon className="size-3" />
                  {item.duration}
                  <span aria-hidden>·</span>
                  Kursi reguler
                </div>
              </div>
              <div className="text-right text-[14px] font-semibold tabular-nums sm:text-[15px]">
                {item.time}
              </div>
              <span
                className={cn(
                  "w-[74px] rounded-md py-1 text-center text-[10px] font-semibold tracking-wide",
                  item.tone === "limited"
                    ? "bg-gold/15 text-gold"
                    : "bg-sage/25 text-sage-soft",
                )}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-paper/10 bg-paper/[0.03] px-5 py-4 sm:px-6">
          <div>
            <p className="text-[9px] font-bold tracking-[0.16em] text-paper/35 uppercase">
              Tarif mulai
            </p>
            <p className="mt-1 text-sm font-semibold">
              {formatRupiah(150_000)}
              <span className="text-xs font-normal text-paper/40"> /kursi</span>
            </p>
          </div>
          <Link
            href="/rute"
            className="group inline-flex items-center gap-1.5 text-[12px] font-semibold text-paper/70 transition-colors hover:text-paper"
          >
            Lihat semua rute
            <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 px-1 text-[11px] text-ink/50">
        <span className="inline-flex items-center gap-1.5">
          <StarIcon className="size-3.5 text-gold" />
          <strong className="font-semibold text-ink">4,9/5</strong> dari 1.240
          ulasan
        </span>
        <span className="inline-flex items-center gap-1.5">
          <WhatsAppIcon className="size-3.5 text-sage" />
          Dibalas rata-rata &lt; 15 menit
        </span>
      </div>
    </div>
  );
}
