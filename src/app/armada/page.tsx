import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { FleetCard } from "@/components/fleet-card";
import { ArrowLink, Pill, SectionHeading, Shell } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { fleet, getFleet } from "@/lib/fleet";
import { formatRupiah, waMessages } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Armada Travel & Sewa Mobil",
  description:
    "Pilih armada travel sesuai jumlah penumpang: Hiace Premio, Hiace Commuter, Elf Long, Innova Zenix, dan Avanza. Lengkap dengan kapasitas, fasilitas, dan tarif.",
  alternates: { canonical: "/armada" },
};

const seatFares = fleet
  .map((item) => item.seatPrice)
  .filter((price): price is number => price !== null);
const lowestSeatFare = Math.min(...seatFares);
const lowestCharter = Math.min(...fleet.map((item) => item.charterPrice));

const guides = [
  {
    slug: "elf-long",
    label: "Rombongan besar",
    text: "Satu kendaraan untuk 15–19 orang, dengan bagasi yang tetap lega.",
  },
  {
    slug: "hiace-premio",
    label: "Perjalanan jauh",
    text: "Captain seat dan kabin tinggi untuk perjalanan 6 jam ke atas.",
  },
  {
    slug: "innova-zenix",
    label: "Privat & fleksibel",
    text: "Disewa penuh, berhenti sesuai permintaan, jemput di alamat sendiri.",
  },
] as const;

export default function ArmadaPage() {
  return (
    <>
      <PageHero
        eyebrow="Armada"
        title={
          <>
            Kendaraan yang siap berangkat,{" "}
            <span className="text-clay italic">bukan yang diparkir.</span>
          </>
        }
        description="Lima tipe kendaraan untuk kebutuhan yang berbeda — dari MPV privat sampai Elf 19 kursi. Semua melewati pemeriksaan sebelum berangkat dan sudah termasuk driver."
        breadcrumbs={[{ name: "Armada" }]}
      >
        <div className="w-full rounded-2xl border border-line bg-[#fffdf8] p-5 shadow-soft lg:w-72">
          <div className="flex items-baseline justify-between gap-3 border-b border-line/80 pb-3">
            <span className="text-[10px] font-bold tracking-[0.14em] text-ink/40 uppercase">
              Per kursi
            </span>
            <span className="text-[15px] font-semibold">
              {formatRupiah(lowestSeatFare)}
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between gap-3">
            <span className="text-[10px] font-bold tracking-[0.14em] text-ink/40 uppercase">
              Sewa harian
            </span>
            <span className="text-[15px] font-semibold">
              {formatRupiah(lowestCharter)}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill tone="green">5 tipe kendaraan</Pill>
            <Pill>6–19 kursi</Pill>
          </div>
        </div>
      </PageHero>

      <section className="py-14 sm:py-16 lg:py-20">
        <Shell>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Pilih kendaraan"
              title={
                <>
                  Sesuaikan dengan{" "}
                  <span className="text-clay italic">jumlah penumpang.</span>
                </>
              }
              description="Tarif per kursi untuk keberangkatan reguler, atau sewa satu kendaraan penuh untuk rute dan durasi yang Anda tentukan sendiri."
            />
            <ArrowLink href="/rute" className="mb-1 shrink-0">
              Lihat rute &amp; tarif
            </ArrowLink>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fleet.map((item) => (
              <FleetCard key={item.slug} item={item} />
            ))}
          </div>

          <p className="mt-6 max-w-2xl text-[12px] leading-relaxed text-ink/40">
            Armada dengan tanda “Privat” tidak dijual per kursi. Sewa dihitung
            per hari dan sudah termasuk driver, BBM, tol, serta asuransi.
            Penginapan driver hanya diperlukan untuk perjalanan lintas kota
            lebih dari satu hari.
          </p>
        </Shell>
      </section>

      <section className="border-y border-line/70 bg-paper-2/45 py-14 sm:py-16">
        <Shell>
          <SectionHeading
            eyebrow="Bingung memilih?"
            title={
              <>
                Tiga kebutuhan,{" "}
                <span className="text-clay italic">tiga jawaban.</span>
              </>
            }
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {guides.map((guide) => {
              const item = getFleet(guide.slug);
              if (!item) return null;

              return (
                <Link
                  key={guide.slug}
                  href={`/armada/${item.slug}`}
                  className="group flex flex-col rounded-2xl border border-line bg-[#fffdf8] p-5 transition-all hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-soft"
                >
                  <span className="text-[10px] font-bold tracking-[0.14em] text-clay uppercase">
                    {guide.label}
                  </span>
                  <span className="mt-2 font-display text-xl font-medium tracking-tight">
                    {item.name}
                  </span>
                  <span className="mt-1.5 flex-1 text-[13px] leading-relaxed text-ink/55">
                    {guide.text}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink/70 transition-colors group-hover:text-clay">
                    Lihat detail
                    <span aria-hidden>→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </Shell>
      </section>

      <CtaBand
        eyebrow="Butuh rekomendasi?"
        title={
          <>
            Sebutkan jumlah orangnya,{" "}
            <span className="text-white/70 italic">kami pilihkan.</span>
          </>
        }
        description="Admin kami akan menyarankan armada yang paling pas — termasuk kalau ternyata lebih hemat menyewa penuh."
        message={waMessages.charter}
        secondary={{ label: "Lihat rute", href: "/rute" }}
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Beranda", path: "/" },
          { name: "Armada", path: "/armada" },
        ])}
      />
    </>
  );
}
