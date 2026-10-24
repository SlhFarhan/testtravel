import Link from "next/link";
import { ArrowRightIcon, ClockIcon } from "@/components/icons";
import { WhatsAppButton } from "@/components/ui";
import type { Route } from "@/lib/routes";
import { formatRupiah, waMessages } from "@/lib/site";

export function RouteRow({ route }: { route: Route }) {
  return (
    <div className="group grid gap-3 border-b border-line/80 py-5 transition-colors md:grid-cols-[minmax(0,1.5fr)_minmax(0,0.85fr)_minmax(0,0.95fr)_auto] md:items-center md:gap-6 md:rounded-xl md:border-transparent md:px-3 md:group-hover:border-line md:hover:bg-[#fffdf8]">
      <div className="min-w-0">
        <Link
          href={`/rute/${route.slug}`}
          className="inline-flex items-baseline gap-2 font-display text-[1.15rem] font-semibold tracking-tight"
        >
          <span>{route.from}</span>
          <ArrowRightIcon className="size-4 shrink-0 self-center text-ink/25 transition-transform duration-200 group-hover:translate-x-0.5" />
          <span>{route.to}</span>
        </Link>
        <p className="mt-1 text-[11px] text-ink/45">
          Berangkat {route.departures.slice(0, 3).join(" · ")}
          {route.departures.length > 3 ? " · …" : ""}
        </p>
      </div>

      <div className="flex items-center gap-4 text-xs text-ink/55 md:block">
        <span className="inline-flex items-center gap-1.5">
          <ClockIcon className="size-3.5 text-ink/30" />
          {route.duration}
        </span>
        <span className="text-ink/35 md:mt-1 md:block">{route.distance}</span>
      </div>

      <div>
        <p className="text-[9px] font-bold tracking-[0.12em] text-ink/40 uppercase">
          Mulai
        </p>
        <p className="mt-0.5 text-[15px] font-semibold">
          {formatRupiah(route.priceFrom)}
          <span className="text-[11px] font-normal text-ink/45"> /kursi</span>
        </p>
      </div>

      <WhatsAppButton
        size="sm"
        variant="outline"
        message={waMessages.route(route.from, route.to)}
        className="w-full justify-center md:w-auto"
      >
        Tanya jadwal
      </WhatsAppButton>
    </div>
  );
}
