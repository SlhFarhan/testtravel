import Link from "next/link";
import { ArrowUpRightIcon, LuggageIcon, UsersIcon } from "@/components/icons";
import { VehicleArt } from "@/components/vehicle-art";
import { Pill } from "@/components/ui";
import type { Fleet } from "@/lib/fleet";
import { formatRupiah } from "@/lib/site";

export function FleetCard({ item }: { item: Fleet }) {
  const price = item.seatPrice ?? item.charterPrice;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-[#fffdf8] transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden">
        <VehicleArt
          theme={item.theme}
          kind={item.category.includes("MPV") ? "car" : "van"}
          label={`Ilustrasi ${item.brand} ${item.name}`}
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Pill className="bg-white/85 backdrop-blur-sm">{item.category}</Pill>
          {item.popular ? <Pill tone="clay">Paling dicari</Pill> : null}
        </div>
        {item.seatPrice === null ? (
          <span className="absolute top-4 right-4 rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-paper backdrop-blur-sm">
            Privat
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-bold tracking-[0.16em] text-ink/40 uppercase">
          {item.brand}
        </p>
        <h3 className="mt-1 font-display text-[1.45rem] leading-tight font-semibold tracking-tight">
          {item.name}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-ink/55">
          {item.tagline}
        </p>

        <dl className="mt-4 flex items-center gap-5 border-y border-line/70 py-3">
          <div className="flex items-center gap-2">
            <UsersIcon className="size-4 text-ink/35" />
            <div>
              <dt className="text-[9px] tracking-wide text-ink/40 uppercase">
                Kursi
              </dt>
              <dd className="text-xs font-semibold">{item.seats}</dd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LuggageIcon className="size-4 text-ink/35" />
            <div>
              <dt className="text-[9px] tracking-wide text-ink/40 uppercase">
                Bagasi
              </dt>
              <dd className="text-xs font-semibold">{item.luggage} koper</dd>
            </div>
          </div>
          <div className="min-w-0">
            <dt className="text-[9px] tracking-wide text-ink/40 uppercase">
              Tipe
            </dt>
            <dd className="truncate text-xs font-semibold">{item.layout}</dd>
          </div>
        </dl>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.12em] text-ink/40 uppercase">
              {item.seatPrice ? "Mulai dari" : "Sewa penuh"}
            </p>
            <p className="mt-1 text-[17px] leading-none font-bold">
              {formatRupiah(price)}
              <span className="text-[11px] font-normal text-ink/45">
                {item.seatPrice ? " /kursi" : " /hari"}
              </span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-clay">
            Detail
            <ArrowUpRightIcon className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>

      <Link
        href={`/armada/${item.slug}`}
        className="absolute inset-0 rounded-2xl"
        aria-label={`Lihat detail ${item.brand} ${item.name}`}
      />
    </article>
  );
}
