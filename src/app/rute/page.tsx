import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CheckIcon, ClockIcon, MapPinIcon, ShieldIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { RouteRow } from "@/components/route-row";
import { RouteSearch } from "@/components/route-search";
import { Pill, Shell, WhatsAppButton } from "@/components/ui";
import { routes, routeOrigins, routeHighlights } from "@/lib/routes";
import { breadcrumbSchema } from "@/lib/structured-data";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Rute & Tarif",
  description:
    "Daftar rute travel mobil antar kota beserta durasi, jam keberangkatan, dan tarif per kursi. Jakarta, Bandung, Semarang, Yogyakarta, Solo, Surabaya, dan Malang.",
  alternates: { canonical: "/rute" },
};

type RouteSearchParams = { dari?: string | string[] };

export default function RutePage({
  searchParams,
}: {
  searchParams: Promise<RouteSearchParams>;
}) {
  return (
    <>
      <PageHeader
        eyebrow="Rute & tarif"
        title={
          <>
            Tarif yang tertera adalah{" "}
            <span className="text-clay italic">tarif yang dibayar.</span>
          </>
        }
        description="Harga per kursi, sekali jalan, sudah termasuk tol, BBM, driver, dan asuransi penumpang. Pilih kota asal untuk mempersempit daftar, lalu konfirmasi jadwal lewat WhatsApp."
        breadcrumbs={[{ label: "Rute & Tarif" }]}
      >
        <div className="flex flex-wrap gap-2">
          <Pill>
            <MapPinIcon className="size-3.5" />
            {routeOrigins.length} kota asal
          </Pill>
          <Pill>
            <ClockIcon className="size-3.5" />
            60+ keberangkatan / minggu
          </Pill>
          <Pill tone="green">
            <ShieldIcon className="size-3.5" />
            Harga final
          </Pill>
        </div>
      </PageHeader>

      <section className="border-b border-line bg-paper-2/35">
        <Shell className="py-8 sm:py-10">
          <RouteSearch />
        </Shell>
      </section>

      <section>
        <Shell className="py-12 lg:py-16">
          <Suspense fallback={<RuteResultsSkeleton />}>
            <RuteResults searchParams={searchParams} />
          </Suspense>
        </Shell>
      </section>

      <section className="border-y border-line bg-paper-2/40">
        <Shell className="py-12 lg:py-16">
          <div className="grid gap-8 rounded-2xl border border-line bg-[#fffdf8] p-7 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow text-clay">Rute tidak ada di daftar?</p>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,2.8vw,2.1rem)] leading-tight tracking-tight">
                Kemungkinan besar kami tetap bisa.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/60">
                Kirim kota asal, tujuan, dan tanggal perjalananmu. Kami akan
                cek ketersediaan armada dan memberi tahu total biayanya —
                termasuk kalau harus ada tambahan jarak.
              </p>
            </div>
            <WhatsAppButton
              size="lg"
              message="Halo Rute Nusa, saya mau tanya rute yang tidak ada di daftar. Rencana perjalanan saya:"
            >
              Tanya rute khusus
            </WhatsAppButton>
          </div>

          <p className="mt-5 flex items-start gap-2 text-[11px] leading-relaxed text-ink/40">
            <CheckIcon className="mt-0.5 size-3.5 shrink-0" />
            Tarif dapat berbeda pada periode libur nasional dan akhir tahun.
            Admin akan menginformasikan harga final sebelum kamu membayar DP.
            Harga tidak berlaku untuk sewa penuh per hari — hubungi admin untuk
            tarif sewa armada.
          </p>
          <p className="mt-3 text-[11px] text-ink/40">
            Admin online {site.hours.toLowerCase()}. Di luar jam tersebut,
            pesan tetap masuk dan dibalas pagi berikutnya.
          </p>
        </Shell>
      </section>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Beranda", path: "/" },
            { name: "Rute & Tarif", path: "/rute" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Rute travel Rute Nusa",
            itemListElement: routes.map((route, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `${route.from} ke ${route.to}`,
              url: `${site.url}/rute`,
            })),
          },
        ]}
      />
    </>
  );
}

async function RuteResults({
  searchParams,
}: {
  searchParams: Promise<RouteSearchParams>;
}) {
  const params = await searchParams;
  const requested = Array.isArray(params.dari) ? params.dari[0] : params.dari;
  const origin =
    requested && routeOrigins.includes(requested) ? requested : null;
  const filtered = origin
    ? routes.filter((route) => route.from === origin)
    : routes;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow text-clay">Jadwal reguler</p>
          <h2 className="mt-2 font-display text-[clamp(1.7rem,3vw,2.25rem)] tracking-tight">
            {origin ? `Rute dari ${origin}` : "Semua rute"}
          </h2>
        </div>
        <p className="text-[11px] text-ink/45">
          {filtered.length} rute tersedia · harga per kursi
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2" aria-label="Filter kota asal">
        <Link
          href="/rute"
          aria-current={origin ? undefined : "page"}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition-colors",
            origin
              ? "border-line bg-[#fffdf8] text-ink/55 hover:border-ink/30 hover:text-ink"
              : "border-ink bg-ink text-paper",
          )}
        >
          Semua
        </Link>
        {routeOrigins.map((city) => {
          const active = origin === city;
          const count = routes.filter((route) => route.from === city).length;

          return (
            <Link
              key={city}
              href={`/rute?dari=${encodeURIComponent(city)}`}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition-colors",
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-[#fffdf8] text-ink/55 hover:border-ink/30 hover:text-ink",
              )}
            >
              {city}
              <span
                className={cn(
                  "ml-1.5 text-[10px] font-normal",
                  active ? "text-paper/45" : "text-ink/30",
                )}
              >
                {count}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-[#fffdf8]/70 px-3 pb-1 sm:px-5">
        <div className="hidden grid-cols-[minmax(0,1.5fr)_minmax(0,0.85fr)_minmax(0,0.95fr)_auto] gap-6 border-b border-line/80 px-3 py-3 text-[9px] font-bold tracking-[0.14em] text-ink/35 uppercase md:grid">
          <span>Rute</span>
          <span>Durasi</span>
          <span>Tarif mulai</span>
          <span className="text-right">Pemesanan</span>
        </div>

        {filtered.length > 0 ? (
          filtered.map((route) => (
            <RouteRow key={route.slug} route={route} />
          ))
        ) : (
          <div className="py-12 text-center">
            <p className="font-display text-xl">
              Belum ada rute dari {origin}.
            </p>
            <p className="mt-2 text-sm text-ink/55">
              Tanya admin, biasanya kami bisa mengatur rute khusus.
            </p>
            <WhatsAppButton
              size="md"
              className="mt-5"
              message={`Halo Rute Nusa, saya butuh travel dari ${origin}. Apakah bisa diatur?`}
            >
              Tanya rute khusus
            </WhatsAppButton>
          </div>
        )}
      </div>

      {filtered.some((route) => route.note) ? (
        <div className="mt-3 space-y-1">
          {filtered
            .filter((route) => route.note)
            .map((route) => (
              <p key={route.slug} className="text-[11px] text-ink/40">
                Catatan {route.from}–{route.to}: {route.note}
              </p>
            ))}
        </div>
      ) : null}

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {routeHighlights.map((note) => (
          <p
            key={note}
            className="flex items-start gap-2 text-[11.5px] leading-relaxed text-ink/50"
          >
            <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-sage" />
            {note}
          </p>
        ))}
      </div>
    </>
  );
}

function RuteResultsSkeleton() {
  return (
    <div aria-hidden>
      <div className="h-3 w-24 rounded bg-paper-3/70" />
      <div className="mt-3 h-8 w-56 rounded bg-paper-3/70" />
      <div className="mt-6 flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-7 w-20 rounded-full bg-paper-3/50"
          />
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-line bg-[#fffdf8]/70 p-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-6 border-b border-line/60 py-5 last:border-0"
          >
            <div className="h-5 flex-1 rounded bg-paper-3/50" />
            <div className="hidden h-4 w-20 rounded bg-paper-3/40 sm:block" />
            <div className="h-4 w-20 rounded bg-paper-3/40" />
            <div className="h-9 w-28 rounded-full bg-paper-3/40" />
          </div>
        ))}
      </div>
    </div>
  );
}
