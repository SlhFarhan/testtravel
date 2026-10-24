import type { Metadata } from "next";
import { DepartureBoard } from "@/components/departure-board";
import { FaqList } from "@/components/faq-list";
import { FleetCard } from "@/components/fleet-card";
import {
  CheckIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldIcon,
  SparkleIcon,
  WalletIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { RouteMotif } from "@/components/route-motif";
import { RouteRow } from "@/components/route-row";
import { RouteSearch } from "@/components/route-search";
import { TestimonialCard } from "@/components/testimonial-card";
import {
  ArrowLink,
  LinkButton,
  Pill,
  SectionHeading,
  Shell,
  Stars,
  WhatsAppButton,
} from "@/components/ui";
import { faqs } from "@/lib/faq";
import { fleet } from "@/lib/fleet";
import { routes } from "@/lib/routes";
import { site, waMessages } from "@/lib/site";
import { faqSchema } from "@/lib/structured-data";
import { stats, testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const popularRoutes = routes.filter((route) => route.popular);

const featuredFleet = fleet.filter((item) =>
  ["hiace-premio", "elf-long", "innova-zenix"].includes(item.slug),
);

const homeFaqs = faqs.slice(0, 6);

const values = [
  {
    icon: ClockIcon,
    title: "Jadwal yang benar-benar berangkat",
    description:
      "Keberangkatan reguler setiap hari. Jika jadwal berubah, kami kabari lewat WhatsApp sebelum Anda berangkat — bukan saat sudah di pool.",
  },
  {
    icon: WalletIcon,
    title: "Harga sesuai yang tertera",
    description:
      "Tarif sudah termasuk tol, BBM, driver, dan asuransi penumpang. Tidak ada biaya tambahan yang muncul di tengah jalan.",
  },
  {
    icon: MapPinIcon,
    title: "Dijemput lebih dekat",
    description:
      "Pool kami di Jakarta Timur, dengan antar-jemput rumah atau hotel untuk area kota. Tanpa perlu repot ke terminal.",
  },
] as const;

const steps = [
  {
    title: "Pilih rute dan tanggal",
    description:
      "Gunakan kolom pencarian di atas, atau buka halaman rute untuk melihat semua jadwal dan tarif per kursi.",
  },
  {
    title: "Kirim pesan ke admin",
    description:
      "Detail perjalanan otomatis terisi di WhatsApp. Anda hanya perlu menambahkan nama dan titik jemput.",
  },
  {
    title: "Konfirmasi, lalu berangkat",
    description:
      "Kursi dikunci setelah uang muka 30%. Sisanya dibayarkan sebelum keberangkatan, transfer atau tunai.",
  },
] as const;

const cityMarquee = [
  "Jakarta",
  "Bandung",
  "Cirebon",
  "Semarang",
  "Yogyakarta",
  "Solo",
  "Surabaya",
  "Malang",
  "Tegal",
  "Purwokerto",
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line/70">
        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[420px] text-ink/[0.07] opacity-70"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-24 size-[38rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(201,79,39,0.14),transparent_65%)]"
        />

        <Shell className="relative pt-12 pb-14 sm:pt-16 lg:pt-20 lg:pb-20">
          <div className="grid gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-16">
            <div className="animate-rise">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="green">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-sage opacity-60" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-sage" />
                  </span>
                  Melayani sejak {site.since}
                </Pill>
                <Pill>10 kota tujuan di Jawa</Pill>
              </div>

              <h1 className="mt-6 font-display text-[clamp(2.6rem,5.6vw,4.15rem)] leading-[0.98] font-medium tracking-[-0.035em]">
                Tiba di tujuan,
                <br />
                <span className="text-clay italic">tanpa drama</span> di jalan.
              </h1>

              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink/60 sm:text-base">
                Travel mobil antar kota dari Jakarta ke Bandung, Yogyakarta,
                Surabaya, dan tujuh kota lain di Jawa. Jadwal pasti, titik
                jemput fleksibel, dan tarif yang sama dengan yang kami
                sebutkan.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WhatsAppButton size="lg">Tanya jadwal hari ini</WhatsAppButton>
                <LinkButton href="/rute" size="lg" variant="outline">
                  Lihat rute &amp; tarif
                </LinkButton>
              </div>

              <ul className="mt-9 flex max-w-lg flex-col gap-4 border-t border-line/80 pt-5 text-[13px] text-ink/55 sm:flex-row sm:gap-6">
                <li className="flex items-center gap-2">
                  <CheckIcon className="size-4 shrink-0 text-sage" />
                  Tanpa akun
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="size-4 shrink-0 text-sage" />
                  Tanpa biaya tersembunyi
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="size-4 shrink-0 text-sage" />
                  Dibalas admin manusia
                </li>
              </ul>
            </div>

            <div className="animate-rise-delay pb-6 sm:pb-2">
              <DepartureBoard />
            </div>
          </div>

          <div className="mt-12 lg:mt-16">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="eyebrow text-clay">
                  <span aria-hidden className="h-px w-6 bg-clay/60" />
                  Cari perjalanan
                </p>
                <p className="mt-2 text-sm text-ink/50">
                  Isi detail perjalanan, kami balas dengan jadwal dan total
                  biayanya.
                </p>
              </div>
              <p className="hidden items-center gap-1.5 text-[11px] font-medium text-ink/40 sm:flex">
                <SparkleIcon className="size-3.5 text-gold" />
                Tanpa pembayaran di situs ini
              </p>
            </div>
            <RouteSearch />
          </div>
        </Shell>
      </section>

      <section className="border-b border-line/60 bg-paper-2/50">
        <Shell className="grid gap-7 py-11 sm:grid-cols-3 sm:gap-8">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="flex gap-3.5">
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-[#fffdf8] text-clay">
                  <Icon className="size-[18px]" />
                </span>
                <div>
                  <h2 className="font-display text-[1.05rem] leading-snug font-semibold tracking-tight">
                    {value.title}
                  </h2>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink/55">
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </Shell>
      </section>

      <div className="marquee-track relative overflow-hidden border-b border-line/60 bg-[#fffdf8] py-4">
        <div className="mask-fade-x flex w-max animate-marquee">
          {[0, 1].map((loop) => (
            <div
              key={loop}
              aria-hidden={loop === 1}
              className="flex shrink-0 items-center"
            >
              {cityMarquee.map((city) => (
                <span
                  key={`${loop}-${city}`}
                  className="flex items-center gap-5 px-5 text-[11px] font-semibold tracking-[0.22em] text-ink/35 uppercase"
                >
                  {city}
                  <span aria-hidden className="size-1 rounded-full bg-clay/50" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="py-16 sm:py-20 lg:py-24">
        <Shell>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Rute populer"
              title={
                <>
                  Kota yang paling sering{" "}
                  <span className="text-clay italic">kami antar.</span>
                </>
              }
              description="Sepuluh rute reguler dengan tarif tetap per kursi. Semua sudah termasuk tol, BBM, driver, dan asuransi penumpang."
            />
            <ArrowLink href="/rute" className="mb-1 shrink-0">
              Semua rute &amp; tarif
            </ArrowLink>
          </div>

          <div className="mt-10 border-t border-line/80">
            {popularRoutes.map((route) => (
              <RouteRow key={route.slug} route={route} />
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-paper-2/40 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
            <div>
              <p className="text-sm font-semibold">
                Tidak menemukan kota tujuanmu?
              </p>
              <p className="mt-1 text-[13px] text-ink/55">
                Kami juga melayani rute khusus dan sewa armada penuh. Ceritakan
                kebutuhanmu, admin akan menghitung rutenya.
              </p>
            </div>
            <WhatsAppButton
              size="sm"
              variant="ink"
              message={waMessages.charter}
              className="shrink-0"
            >
              Tanya rute khusus
            </WhatsAppButton>
          </div>
        </Shell>
      </section>

      <section className="border-y border-line/70 bg-paper-2/45 py-16 sm:py-20 lg:py-24">
        <Shell>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Armada"
              title={
                <>
                  Kendaraan yang dirawat,{" "}
                  <span className="text-clay italic">bukan sekadar disewa.</span>
                </>
              }
              description="Dari MPV privat sampai Elf 19 kursi. Semua armada melewati pemeriksaan berkala sebelum berangkat."
            />
            <ArrowLink href="/armada" className="mb-1 shrink-0">
              Lihat semua armada
            </ArrowLink>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredFleet.map((item) => (
              <FleetCard key={item.slug} item={item} />
            ))}
          </div>
        </Shell>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Shell className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Cara pesan"
              title={
                <>
                  Semudah kirim{" "}
                  <span className="text-clay italic">satu pesan.</span>
                </>
              }
              description="Tidak ada formulir panjang, tidak ada akun yang harus dibuat. Semua diurus lewat WhatsApp resmi kami."
            />

            <ol className="mt-9 space-y-0">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="relative flex gap-4 border-b border-line/70 py-5 last:border-0 last:pb-0"
                >
                  <span className="font-display text-[1.6rem] leading-none font-medium tabular-nums text-clay/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold">{step.title}</h3>
                    <p className="mt-1.5 max-w-md text-[13.5px] leading-relaxed text-ink/55">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-6 flex items-center gap-2 text-[12px] text-ink/45">
              <WhatsAppIcon className="size-4 text-sage" />
              Rata-rata dibalas &lt; 15 menit, setiap hari 06.00–21.00 WIB.
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-clay/15 via-gold/10 to-sage/15 blur-2xl"
            />
            <div className="grain relative overflow-hidden rounded-[1.75rem] bg-ink p-7 text-paper shadow-lift sm:p-9">
              <RouteMotif className="absolute -top-4 right-0 w-[420px] text-paper/15" />
              <div className="relative">
                <p className="eyebrow text-gold">
                  <span aria-hidden className="h-px w-6 bg-gold/60" />
                  Sejak {site.since}
                </p>
                <p className="mt-4 max-w-sm font-display text-2xl leading-tight font-medium tracking-tight">
                  Angka yang kami jaga, bukan sekadar dipamerkan.
                </p>

                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="sr-only">{stat.label}</dt>
                      <dd>
                        <span className="font-display text-[1.85rem] leading-none font-medium text-gold">
                          {stat.value}
                        </span>
                        <span className="mt-2 block max-w-[11rem] text-[11.5px] leading-relaxed text-paper/50">
                          {stat.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex items-start gap-2.5 rounded-xl border border-paper/10 bg-paper/[0.04] px-4 py-3.5">
                  <ShieldIcon className="mt-0.5 size-4 shrink-0 text-sage-soft" />
                  <p className="text-[11.5px] leading-relaxed text-paper/55">
                    Setiap perjalanan tercatat, dengan asuransi penumpang dan
                    driver yang mengenal rute Jawa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      <section className="relative overflow-hidden border-y border-ink/10 bg-ink py-16 text-paper sm:py-20 lg:py-24">
        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute inset-0 text-paper/[0.06]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(200,146,47,0.16),transparent_65%)]"
        />

        <Shell className="relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Kata penumpang"
              tone="light"
              title={
                <>
                  Mereka sudah duduk,{" "}
                  <span className="text-gold italic">sekarang giliranmu.</span>
                </>
              }
              description="Ulasan dari penumpang yang berangkat bersama kami dalam dua tahun terakhir."
            />
            <div className="mb-1 flex items-center gap-3 rounded-full border border-paper/15 bg-paper/5 px-4 py-2">
              <Stars value={5} />
              <span className="text-[11px] font-semibold tracking-wide text-paper/70">
                4,9/5 · 1.240 ulasan
              </span>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((item) => (
              <TestimonialCard key={item.name} item={item} />
            ))}
          </div>
        </Shell>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Shell className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Pertanyaan umum"
              title={
                <>
                  Hal yang biasanya{" "}
                  <span className="text-clay italic">ditanyakan duluan.</span>
                </>
              }
              description="Belum terjawab? Admin kami siap membantu tanpa jawaban template."
            />

            <div className="mt-8 rounded-2xl border border-line bg-[#fffdf8] p-5">
              <p className="text-sm font-semibold">Masih ada pertanyaan?</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink/55">
                Hubungi admin kami langsung. Dibalas manusia, bukan bot.
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                <WhatsAppButton size="sm" className="w-full">
                  Chat admin
                </WhatsAppButton>
                <a
                  href={site.phone.href}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-ink/15 text-[13px] font-semibold transition-colors hover:bg-ink/[0.04]"
                >
                  <PhoneIcon className="size-4 text-ink/50" />
                  {site.phone.display}
                </a>
              </div>
            </div>
          </div>

          <div>
            <FaqList items={homeFaqs} />
            <div className="mt-6 flex justify-end">
              <ArrowLink href="/faq">Baca semua FAQ</ArrowLink>
            </div>
          </div>
        </Shell>
      </section>

      <section className="relative overflow-hidden bg-clay text-white">
        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute inset-0 text-white/10"
        />
        <RouteMotif className="pointer-events-none absolute -right-10 -bottom-8 hidden w-[520px] text-white/20 lg:block" />

        <Shell className="relative flex flex-col gap-8 py-14 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <div className="max-w-xl">
            <p className="eyebrow text-white/60">
              <span aria-hidden className="h-px w-6 bg-white/40" />
              Berangkat besok?
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] font-medium tracking-[-0.02em]">
              Masih ada kursi.{" "}
              <span className="text-white/70 italic">Tinggal pilih jamnya.</span>
            </h2>
            <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-white/70">
              Jadwal reguler berangkat setiap hari dari Jakarta. Sampaikan
              tujuan, tanggal, dan jumlah penumpang — sisanya kami urus.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <WhatsAppButton
              size="lg"
              variant="light"
              message={waMessages.general}
            >
              Pesan kursi via WhatsApp
            </WhatsAppButton>
            <LinkButton
              href="/kontak"
              size="lg"
              variant="outlineLight"
              className="border-white/40"
            >
              Hubungi kami
            </LinkButton>
          </div>
        </Shell>
      </section>

      <JsonLd data={faqSchema(homeFaqs)} />
    </>
  );
}
