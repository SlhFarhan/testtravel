import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldIcon,
  UsersIcon,
} from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { RouteRow } from "@/components/route-row";
import { Pill, SectionHeading, Shell, WhatsAppButton } from "@/components/ui";
import { getRoute, routeHighlights, routes } from "@/lib/routes";
import {
  addressLine,
  formatRupiah,
  site,
  waMessages,
} from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const instant = false;

export function generateStaticParams() {
  return routes.map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getRoute(slug);

  if (!route) {
    return { title: "Rute tidak ditemukan" };
  }

  return {
    title: `Travel ${route.from}–${route.to}`,
    description: `Jadwal travel ${route.from} ke ${route.to}: berangkat ${route.departures.join(", ")}. Estimasi ${route.duration}, tarif mulai ${formatRupiah(route.priceFrom)} per kursi, sudah termasuk tol, BBM, driver, dan asuransi.`,
    alternates: { canonical: `/rute/${route.slug}` },
  };
}

export default async function RuteDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const route = getRoute(slug);

  if (!route) notFound();

  const related = routes
    .filter(
      (item) =>
        item.slug !== route.slug &&
        (item.from === route.from || item.to === route.to),
    )
    .slice(0, 3);

  const routeSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Travel ${route.from}–${route.to}`,
    serviceType: "Travel mobil antar kota",
    provider: { "@id": `${site.url}/#organization` },
    areaServed: [route.from, route.to],
    offers: {
      "@type": "Offer",
      price: route.priceFrom,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `${site.url}/rute/${route.slug}`,
    },
  };

  return (
    <>
      <PageHero
        eyebrow={`Rute reguler · ${route.duration}`}
        title={
          <>
            Travel {route.from} ke{" "}
            <span className="text-clay italic">{route.to}</span>
          </>
        }
        description={
          <>
            Berangkat setiap hari dari {route.from} pukul{" "}
            {route.departures.join(", ")} WIB. Estimasi perjalanan{" "}
            {route.duration} untuk jarak sekitar {route.distance}, dengan
            istirahat di rest area bila diperlukan.
          </>
        }
        breadcrumbs={[
          { name: "Rute & Tarif", href: "/rute" },
          { name: `${route.from}–${route.to}` },
        ]}
      >
        <div className="w-full rounded-2xl border border-line bg-[#fffdf8] p-5 shadow-soft lg:w-72">
          <p className="text-[10px] font-bold tracking-[0.14em] text-ink/40 uppercase">
            Tarif mulai
          </p>
          <p className="mt-2 font-display text-[2.35rem] leading-none font-medium">
            {formatRupiah(route.priceFrom)}
            <span className="text-sm font-normal text-ink/45"> /kursi</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Pill tone="green">
              <UsersIcon className="size-3" />
              Kursi reguler
            </Pill>
            <Pill>
              <ClockIcon className="size-3" />
              {route.duration}
            </Pill>
          </div>
          <WhatsAppButton
            size="md"
            message={waMessages.route(route.from, route.to)}
            className="mt-4 w-full"
          >
            Tanya jadwal
          </WhatsAppButton>
        </div>
      </PageHero>

      <section className="py-12 sm:py-16">
        <Shell className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-12">
          <div>
            <div className="rounded-2xl border border-line bg-[#fffdf8] p-6 sm:p-7">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] text-ink/40 uppercase">
                <ClockIcon className="size-4" />
                Jadwal keberangkatan
              </div>
              <h2 className="mt-3 font-display text-2xl font-medium tracking-tight">
                Pilih jam yang paling pas.
              </h2>
              <ul className="mt-5 divide-y divide-line/80">
                {route.departures.map((time) => (
                  <li
                    key={time}
                    className="flex flex-wrap items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-[1.35rem] font-semibold tabular-nums">
                        {time}
                      </span>
                      <span className="text-[11px] font-semibold tracking-wide text-ink/40 uppercase">
                        WIB
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-ink/50">
                      <MapPinIcon className="size-3.5 text-ink/30" />
                      {route.from}
                      <ArrowRightIcon className="size-3 text-ink/25" />
                      {route.to}
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-xl border border-line/80 bg-paper-2/40 px-4 py-3 text-[12px] leading-relaxed text-ink/50">
                Jadwal di atas adalah jadwal reguler. Ketersediaan kursi
                dikonfirmasi lewat WhatsApp sebelum Anda melakukan pembayaran.
              </p>
            </div>

            <div className="mt-10">
              <SectionHeading
                eyebrow="Yang termasuk"
                title="Satu tarif, semua sudah dihitung."
              />
              <ul className="mt-6 space-y-3">
                {routeHighlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-[13.5px] leading-relaxed text-ink/60"
                  >
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-sage" />
                    {highlight}
                  </li>
                ))}
                {route.note ? (
                  <li className="flex gap-3 text-[13.5px] leading-relaxed text-ink/60">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-sage" />
                    {route.note}
                  </li>
                ) : null}
              </ul>
            </div>

            <div className="mt-10 rounded-2xl border border-line bg-paper-2/40 p-6">
              <h2 className="font-display text-xl font-medium tracking-tight">
                Titik jemput
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/55">
                Pool utama kami di {addressLine}. Penjemputan di rumah, hotel,
                atau terminal area {route.from} tersedia sesuai jarak — sampaikan
                alamat lengkap saat memesan.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <WhatsAppButton
                  size="sm"
                  variant="ink"
                  message={waMessages.route(route.from, route.to)}
                >
                  Atur titik jemput
                </WhatsAppButton>
                <Link
                  href="/kontak"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-ink/15 px-4 text-[13px] font-semibold transition-colors hover:bg-ink/[0.04]"
                >
                  Lihat lokasi pool
                  <ArrowRightIcon className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-ink text-paper shadow-lift">
              <div className="border-b border-paper/10 px-6 py-5">
                <p className="text-[10px] font-bold tracking-[0.16em] text-gold uppercase">
                  Pesan kursi
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-paper/60">
                  Tidak ada checkout di situs ini. Kirim detail perjalanan ke
                  admin, kursi dikunci setelah konfirmasi.
                </p>
              </div>

              <div className="space-y-4 px-6 py-5 text-[13px]">
                <div className="flex items-center justify-between gap-3 border-b border-paper/10 pb-3">
                  <span className="text-paper/50">Rute</span>
                  <span className="font-semibold">
                    {route.from} → {route.to}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-paper/10 pb-3">
                  <span className="text-paper/50">Tarif mulai</span>
                  <span className="font-semibold">
                    {formatRupiah(route.priceFrom)}{" "}
                    <span className="text-[11px] font-normal text-paper/45">
                      /kursi
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-paper/10 pb-3">
                  <span className="text-paper/50">Uang muka</span>
                  <span className="font-semibold">30% saat konfirmasi</span>
                </div>
                <div className="flex items-start gap-2 text-[11.5px] leading-relaxed text-paper/45">
                  <ShieldIcon className="mt-0.5 size-4 shrink-0 text-sage-soft" />
                  Pembayaran hanya ke rekening resmi yang tertera pada invoice
                  dari admin kami.
                </div>
              </div>

              <div className="space-y-2.5 border-t border-paper/10 px-6 py-5">
                <WhatsAppButton
                  size="md"
                  variant="light"
                  message={waMessages.route(route.from, route.to)}
                  className="w-full"
                >
                  Pesan via WhatsApp
                </WhatsAppButton>
                <a
                  href={site.phone.href}
                  className="flex h-10 items-center justify-center gap-2 rounded-full border border-paper/20 text-[13px] font-semibold text-paper/80 transition-colors hover:bg-paper/10"
                >
                  <PhoneIcon className="size-4" />
                  {site.phone.display}
                </a>
              </div>
            </div>
          </aside>
        </Shell>
      </section>

      {related.length ? (
        <section className="border-t border-line/70 bg-paper-2/40 py-14 sm:py-16">
          <Shell>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Rute terkait"
                title="Lanjut ke kota lain?"
              />
              <Link
                href="/rute"
                className="mb-1 inline-flex items-center gap-1.5 text-sm font-semibold text-ink/60 transition-colors hover:text-clay"
              >
                Semua rute
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
            <div className="mt-6 border-t border-line/80">
              {related.map((item) => (
                <RouteRow key={item.slug} route={item} />
              ))}
            </div>
          </Shell>
        </section>
      ) : null}

      <CtaBand
        eyebrow={`Berangkat dari ${route.from}`}
        title={
          <>
            Butuh jam lain?{" "}
            <span className="text-white/70 italic">Tanyakan dulu.</span>
          </>
        }
        description={`Kami bisa menyesuaikan waktu keberangkatan ${route.from}–${route.to} selama kursi masih tersedia.`}
        message={waMessages.route(route.from, route.to)}
        secondary={{ label: "Lihat armada", href: "/armada" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Beranda", path: "/" },
            { name: "Rute & Tarif", path: "/rute" },
            { name: `${route.from}–${route.to}`, path: `/rute/${route.slug}` },
          ]),
          routeSchema,
        ]}
      />
    </>
  );
}
