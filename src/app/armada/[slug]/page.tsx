import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { FleetCard } from "@/components/fleet-card";
import {
  CheckIcon,
  LuggageIcon,
  PhoneIcon,
  ShieldIcon,
  UsersIcon,
} from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { VehicleArt } from "@/components/vehicle-art";
import {
  Pill,
  SectionHeading,
  Shell,
  WhatsAppButton,
} from "@/components/ui";
import { fleet, getFleet } from "@/lib/fleet";
import { formatRupiah, site, waMessages } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const instant = false;

export function generateStaticParams() {
  return fleet.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getFleet(slug);

  if (!item) {
    return { title: "Armada tidak ditemukan" };
  }

  return {
    title: `${item.brand} ${item.name}`,
    description: `${item.tagline} ${item.seats} kursi, bagasi ${item.luggage} koper. ${
      item.seatPrice
        ? `Tarif mulai ${formatRupiah(item.seatPrice)} per kursi.`
        : `Sewa penuh mulai ${formatRupiah(item.charterPrice)} per hari.`
    }`,
    alternates: { canonical: `/armada/${item.slug}` },
  };
}

export default async function ArmadaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getFleet(slug);

  if (!item) notFound();

  const otherFleet = fleet
    .filter((entry) => entry.slug !== item.slug)
    .slice(0, 3);

  const specRows = [
    { label: "Kategori", value: item.category },
    { label: "Kapasitas", value: `${item.seats} kursi` },
    { label: "Bagasi", value: `${item.luggage} koper 24"` },
    { label: "Susunan kursi", value: item.layout },
    ...(item.seatPrice
      ? [
          {
            label: "Tarif per kursi",
            value: `${formatRupiah(item.seatPrice)} /kursi`,
          },
        ]
      : []),
    { label: "Sewa penuh", value: `${formatRupiah(item.charterPrice)} /hari` },
  ];

  const fleetSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${item.brand} ${item.name}`,
    description: item.description,
    category: item.category,
    brand: { "@type": "Brand", name: item.brand },
    offers: {
      "@type": "Offer",
      price: item.seatPrice ?? item.charterPrice,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `${site.url}/armada/${item.slug}`,
    },
  };

  return (
    <>
      <PageHero
        eyebrow={item.category}
        title={
          <>
            {item.brand}{" "}
            <span className="text-clay italic">{item.name}</span>
          </>
        }
        description={item.description}
        breadcrumbs={[
          { name: "Armada", href: "/armada" },
          { name: item.name },
        ]}
      >
        <div className="w-full rounded-2xl border border-line bg-[#fffdf8] p-5 shadow-soft lg:w-72">
          <p className="text-[10px] font-bold tracking-[0.14em] text-ink/40 uppercase">
            {item.seatPrice ? "Tarif per kursi" : "Sewa penuh"}
          </p>
          <p className="mt-2 font-display text-[2.1rem] leading-none font-medium">
            {formatRupiah(item.seatPrice ?? item.charterPrice)}
            <span className="text-sm font-normal text-ink/45">
              {item.seatPrice ? " /kursi" : " /hari"}
            </span>
          </p>
          {item.seatPrice ? (
            <p className="mt-2 text-[11.5px] text-ink/45">
              Sewa penuh {formatRupiah(item.charterPrice)} /hari
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2">
            <Pill tone="green">
              <UsersIcon className="size-3" />
              {item.seats} kursi
            </Pill>
            <Pill>
              <LuggageIcon className="size-3" />
              {item.luggage} koper
            </Pill>
          </div>
          <WhatsAppButton
            size="md"
            message={waMessages.fleet(item.name)}
            className="mt-4 w-full"
          >
            Tanya ketersediaan
          </WhatsAppButton>
        </div>
      </PageHero>

      <section className="py-12 sm:py-16">
        <Shell className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-12">
          <div>
            <div className="overflow-hidden rounded-2xl border border-line">
              <div className="aspect-[16/10]">
                <VehicleArt
                  theme={item.theme}
                  kind={item.category.includes("MPV") ? "car" : "van"}
                  label={`Ilustrasi ${item.brand} ${item.name}`}
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[#fffdf8] px-5 py-3.5">
                <p className="text-[11px] font-semibold tracking-wide text-ink/40 uppercase">
                  {item.brand} · {item.category}
                </p>
                <p className="text-[11px] text-ink/40">{item.layout}</p>
              </div>
            </div>

            <div className="mt-8">
              <SectionHeading
                eyebrow="Kenapa armada ini"
                title="Yang membuat perjalanan terasa lebih pendek."
              />
              <ul className="mt-6 space-y-3">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-[13.5px] leading-relaxed text-ink/60"
                  >
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-sage" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9">
              <h2 className="text-[11px] font-bold tracking-[0.14em] text-ink/40 uppercase">
                Fasilitas di dalam kendaraan
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {item.facilities.map((facility) => (
                  <li
                    key={facility}
                    className="flex items-center gap-2 rounded-xl border border-line bg-[#fffdf8] px-3.5 py-2.5 text-[12px] font-medium text-ink/65"
                  >
                    <span
                      aria-hidden
                      className="size-1.5 shrink-0 rounded-full bg-clay"
                    />
                    {facility}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9">
              <h2 className="text-[11px] font-bold tracking-[0.14em] text-ink/40 uppercase">
                Paling cocok untuk
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.bestFor.map((entry) => (
                  <Pill key={entry}>{entry}</Pill>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-line bg-[#fffdf8] p-6">
              <p className="text-[10px] font-bold tracking-[0.14em] text-ink/40 uppercase">
                Ringkasan armada
              </p>
              <dl className="mt-4 divide-y divide-line/80 text-[13px]">
                {specRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
                  >
                    <dt className="text-ink/45">{row.label}</dt>
                    <dd className="text-right font-semibold">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 space-y-2.5">
                <WhatsAppButton
                  variant="clay"
                  message={waMessages.fleet(item.name)}
                  className="w-full"
                >
                  Pesan armada ini
                </WhatsAppButton>
                <a
                  href={site.phone.href}
                  className="flex h-10 items-center justify-center gap-2 rounded-full border border-ink/15 text-[13px] font-semibold transition-colors hover:bg-ink/[0.04]"
                >
                  <PhoneIcon className="size-4 text-ink/50" />
                  {site.phone.display}
                </a>
              </div>

              <div className="mt-5 flex items-start gap-2 rounded-xl border border-line/80 bg-paper-2/40 px-4 py-3">
                <ShieldIcon className="mt-0.5 size-4 shrink-0 text-sage" />
                <p className="text-[11.5px] leading-relaxed text-ink/50">
                  Sewa penuh sudah termasuk driver, BBM, tol, dan asuransi
                  penumpang. Penginapan driver hanya diperlukan untuk
                  perjalanan lebih dari satu hari.
                </p>
              </div>
            </div>
          </aside>
        </Shell>
      </section>

      <section className="border-t border-line/70 bg-paper-2/40 py-14 sm:py-16">
        <Shell>
          <SectionHeading
            eyebrow="Armada lain"
            title="Mungkin ada yang lebih pas."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherFleet.map((entry) => (
              <FleetCard key={entry.slug} item={entry} />
            ))}
          </div>
        </Shell>
      </section>

      <CtaBand
        eyebrow="Siap memesan?"
        title={
          <>
            Cek ketersediaan{" "}
            <span className="text-white/70 italic">{item.name}.</span>
          </>
        }
        description="Sampaikan tanggal, rute, dan jumlah penumpang. Admin kami mengonfirmasi unit yang tersedia beserta total biayanya."
        message={waMessages.fleet(item.name)}
        secondary={{ label: "Lihat rute", href: "/rute" }}
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Beranda", path: "/" },
            { name: "Armada", path: "/armada" },
            { name: item.name, path: `/armada/${item.slug}` },
          ]),
          fleetSchema,
        ]}
      />
    </>
  );
}
