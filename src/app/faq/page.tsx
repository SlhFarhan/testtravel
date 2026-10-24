import type { Metadata } from "next";
import { ClockIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { Shell, WhatsAppButton } from "@/components/ui";
import { faqs } from "@/lib/faq";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Pertanyaan yang sering ditanyakan tentang pemesanan, bagasi, penjemputan, pembayaran, dan pembatalan travel Rute Nusa.",
  alternates: { canonical: "/faq" },
};

const categories = [
  {
    name: "Pemesanan" as const,
    id: "pemesanan",
    description:
      "Cara memesan, mengubah jadwal, dan menyewa satu armada penuh.",
  },
  {
    name: "Perjalanan" as const,
    id: "perjalanan",
    description:
      "Bagasi, titik jemput, kursi bayi, dan hal-hal di sepanjang jalan.",
  },
  {
    name: "Pembayaran" as const,
    id: "pembayaran",
    description:
      "DP, metode pembayaran, dan aturan pembatalan yang berlaku.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title={
          <>
            Jawaban sebelum{" "}
            <span className="text-clay italic">kamu bertanya.</span>
          </>
        }
        description="Kami kumpulkan pertanyaan yang paling sering masuk ke WhatsApp admin. Kalau yang kamu cari belum ada, tanya langsung — dijawab oleh orang, bukan bot."
        breadcrumbs={[{ label: "FAQ" }]}
      />

      <section>
        <Shell className="py-12 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
            <aside className="self-start lg:sticky lg:top-24">
              <p className="eyebrow text-clay">Kategori</p>
              <nav aria-label="Kategori FAQ" className="mt-4">
                <ul className="space-y-1">
                  {categories.map((category) => {
                    const count = faqs.filter(
                      (item) => item.category === category.name,
                    ).length;

                    return (
                      <li key={category.id}>
                        <a
                          href={`#${category.id}`}
                          className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-ink/60 transition-colors hover:bg-white/60 hover:text-ink"
                        >
                          {category.name}
                          <span className="text-[10px] text-ink/30">
                            {count}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-8 rounded-2xl border border-line bg-[#fffdf8] p-5">
                <p className="text-[10px] font-bold tracking-[0.14em] text-ink/40 uppercase">
                  Belum terjawab?
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/60">
                  Admin kami bisa menjawab pertanyaan spesifik soal rute,
                  jadwal, dan kebutuhan rombonganmu.
                </p>
                <WhatsAppButton size="md" variant="ink" className="mt-4 w-full">
                  Chat admin
                </WhatsAppButton>
                <div className="mt-4 space-y-2 border-t border-line pt-4 text-[11px] text-ink/50">
                  <a
                    href={site.phone.href}
                    className="flex items-center gap-2 hover:text-ink"
                  >
                    <PhoneIcon className="size-3.5" />
                    {site.phone.display}
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-2 hover:text-ink"
                  >
                    <MailIcon className="size-3.5" />
                    {site.email}
                  </a>
                  <p className="flex items-start gap-2">
                    <ClockIcon className="mt-0.5 size-3.5 shrink-0" />
                    {site.hours}
                  </p>
                </div>
              </div>

              <p className="mt-5 flex items-start gap-2 text-[10.5px] leading-relaxed text-ink/35">
                <WhatsAppIcon className="mt-0.5 size-3.5 shrink-0" />
                Pemesanan hanya diproses melalui WhatsApp resmi yang tertera di
                situs ini.
              </p>
            </aside>

            <div className="space-y-12">
              {categories.map((category) => {
                const items = faqs.filter(
                  (item) => item.category === category.name,
                );

                return (
                  <section key={category.id} id={category.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="font-display text-[clamp(1.5rem,2.4vw,1.9rem)] tracking-tight">
                        {category.name}
                      </h2>
                      <p className="text-[10.5px] text-ink/35">
                        {items.length} pertanyaan
                      </p>
                    </div>
                    <p className="mt-1.5 max-w-lg text-[12.5px] leading-relaxed text-ink/50">
                      {category.description}
                    </p>
                    <FaqList items={items} className="mt-5" />
                  </section>
                );
              })}

              <div className="rounded-2xl bg-paper-2/60 p-6 sm:p-7">
                <h2 className="font-display text-xl tracking-tight">
                  Masih ada yang mengganjal?
                </h2>
                <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-ink/60">
                  Kirim pertanyaanmu lewat WhatsApp. Kami tidak memakai jawaban
                  template — admin akan membaca detail perjalananmu dan menjawab
                  sesuai situasinya.
                </p>
                <WhatsAppButton size="md" className="mt-4">
                  Tanya lewat WhatsApp
                </WhatsAppButton>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Beranda", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />
    </>
  );
}
