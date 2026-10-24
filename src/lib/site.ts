const rawNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "6281234567890";
const numberDigits = rawNumber.replace(/\D/g, "");

function formatWhatsApp(value: string) {
  const local = value.startsWith("62")
    ? value.slice(2)
    : value.replace(/^0/, "");
  const match = local.match(/^(\d{3})(\d{4})(\d+)$/);

  return match ? `+62 ${match[1]}-${match[2]}-${match[3]}` : `+${value}`;
}

export const site = {
  name: "Rute Nusa",
  legalName: "Rute Nusa Travel",
  tagline: "Travel mobil antar kota",
  description:
    "Travel mobil antar kota dengan jadwal pasti, armada terawat, dan harga transparan. Pemesanan kursi langsung melalui WhatsApp tanpa perlu membuat akun.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://rutenusa.id",
  whatsapp: {
    number: numberDigits,
    display: formatWhatsApp(numberDigits),
  },
  phone: {
    display: formatWhatsApp(numberDigits),
    href: `tel:+${numberDigits}`,
  },
  email: "halo@rutenusa.id",
  address: {
    street: "Jl. Raya Kalimalang No. 88, Blok C",
    district: "Duren Sawit",
    city: "Jakarta Timur",
    region: "DKI Jakarta",
    postalCode: "13440",
    country: "ID",
  },
  hours: "Setiap hari, 06.00–21.00 WIB",
  since: 2016,
  socials: [
    { label: "Instagram", handle: "@rutenusa", href: "https://instagram.com/rutenusa" },
    { label: "TikTok", handle: "@rutenusa", href: "https://tiktok.com/@rutenusa" },
  ],
} as const;

export const addressLine = `${site.address.street}, ${site.address.district}, ${site.address.city} ${site.address.postalCode}`;

export const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Armada", href: "/armada" },
  { label: "Rute & Tarif", href: "/rute" },
  { label: "Tentang", href: "/tentang" },
  { label: "FAQ", href: "/faq" },
  { label: "Kontak", href: "/kontak" },
] as const;

export const cities = [
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
] as const;

export const waMessages = {
  general:
    "Halo Rute Nusa, saya mau tanya jadwal dan harga travel antar kota. Bisa dibantu?",
  fleet: (name: string) =>
    `Halo Rute Nusa, saya mau tanya ketersediaan armada ${name}. Mohon info jadwal, tarif, dan rute yang tersedia.`,
  route: (from: string, to: string) =>
    `Halo Rute Nusa, saya mau tanya jadwal travel ${from} → ${to}. Mohon info jam keberangkatan dan harga per kursi.`,
  charter:
    "Halo Rute Nusa, saya mau tanya sewa armada untuk rombongan. Berikut kebutuhan saya:",
} as const;

/**
 * Membuat tautan WhatsApp dengan pesan yang sudah terisi otomatis.
 * Semua tombol pemesanan di situs mengarah ke sini — tidak ada checkout,
 * pembayaran, maupun pembuatan akun.
 */
export function waLink(message: string = waMessages.general) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function formatRupiah(value: number) {
  return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
}

export function formatDate(value: string) {
  if (!value) return "-";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function bookingMessage(input: {
  from: string;
  to: string;
  date: string;
  passengers: number;
  notes?: string;
}) {
  const lines = [
    "Halo Rute Nusa, saya mau pesan travel:",
    "",
    `• Rute: ${input.from} → ${input.to}`,
    `• Tanggal: ${formatDate(input.date)}`,
    `• Penumpang: ${input.passengers} orang`,
  ];

  if (input.notes?.trim()) {
    lines.push(`• Catatan: ${input.notes.trim()}`);
  }

  lines.push(
    "",
    "Mohon info jadwal keberangkatan, ketersediaan kursi, dan total biayanya. Terima kasih.",
  );

  return lines.join("\n");
}
