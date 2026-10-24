export type FleetTheme = "clay" | "sage" | "ink" | "gold" | "sky";

export type Fleet = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  tagline: string;
  seats: number;
  luggage: number;
  seatPrice: number | null;
  charterPrice: number;
  layout: string;
  description: string;
  highlights: string[];
  facilities: string[];
  bestFor: string[];
  theme: FleetTheme;
  popular?: boolean;
};

export const fleet: Fleet[] = [
  {
    slug: "hiace-premio",
    name: "Hiace Premio",
    brand: "Toyota",
    category: "Minibus premium",
    tagline: "Kursi captain seat untuk perjalanan jauh.",
    seats: 12,
    luggage: 8,
    seatPrice: 290_000,
    charterPrice: 2_100_000,
    layout: "2–2 captain seat",
    description:
      "Pilihan utama untuk rute jarak jauh seperti Jakarta–Yogyakarta atau Jakarta–Surabaya. Kabin tinggi, kursi captain seat, dan suspensi yang lembut membuat 9 jam di jalan tetap terasa masuk akal.",
    highlights: [
      "Kursi captain seat dengan recline dan legroom ekstra",
      "Kabin tinggi, bebas rasa sesak di baris belakang",
      "Bagasi belakang muat 8 koper ukuran 24 inci",
    ],
    facilities: [
      "AC double blower",
      "USB charger tiap baris",
      "Wi-Fi onboard",
      "LED TV",
      "Selimut & bantal",
      "Air mineral",
      "Asuransi penumpang",
    ],
    bestFor: ["Perjalanan 6–12 jam", "Rombongan keluarga", "Perjalanan dinas"],
    theme: "clay",
    popular: true,
  },
  {
    slug: "hiace-commuter",
    name: "Hiace Commuter",
    brand: "Toyota",
    category: "Minibus",
    tagline: "Armada paling sering berangkat, paling sering penuh.",
    seats: 14,
    luggage: 10,
    seatPrice: 240_000,
    charterPrice: 1_750_000,
    layout: "2–2, lorong tengah",
    description:
      "Armada andalan untuk rute padat seperti Jakarta–Bandung dan Jakarta–Cirebon. Kapasitas 14 kursi dengan bagasi luas, cocok untuk rombongan kecil yang ingin berangkat bersama.",
    highlights: [
      "Kapasitas 14 kursi dengan lorong tengah",
      "Bagasi luas untuk koper dan perlengkapan bayi",
      "Jadwal keberangkatan paling sering",
    ],
    facilities: [
      "AC double blower",
      "USB charger",
      "Selimut & bantal",
      "Air mineral",
      "Bagasi luas",
      "Asuransi penumpang",
    ],
    bestFor: ["Rombongan 8–14 orang", "Rute jarak menengah", "Perjalanan hemat"],
    theme: "sage",
  },
  {
    slug: "elf-long",
    name: "Elf Long",
    brand: "Isuzu",
    category: "Minibus rombongan",
    tagline: "Satu kendaraan untuk satu rombongan.",
    seats: 19,
    luggage: 12,
    seatPrice: 195_000,
    charterPrice: 1_500_000,
    layout: "2–2, 5 baris",
    description:
      "Solusi paling efisien untuk rombongan besar: keluarga besar, komunitas, atau tim kantor. Tarif per kursi paling ringan, dengan ruang bagasi yang tidak perlu dikompromikan.",
    highlights: [
      "19 kursi dalam satu kendaraan",
      "Bagasi belakang besar untuk 12 koper",
      "Tarif per kursi paling ekonomis",
    ],
    facilities: [
      "AC double blower",
      "USB charger",
      "Selimut",
      "Air mineral",
      "Bagasi besar",
      "Asuransi penumpang",
    ],
    bestFor: ["Rombongan 15–19 orang", "Wisata kelompok", "Kegiatan kantor"],
    theme: "gold",
  },
  {
    slug: "innova-zenix",
    name: "Innova Zenix",
    brand: "Toyota",
    category: "MPV privat",
    tagline: "Privat, tenang, dan berhenti sesuai permintaan.",
    seats: 6,
    luggage: 4,
    seatPrice: null,
    charterPrice: 1_450_000,
    layout: "2–2–2",
    description:
      "Disewa satu kendaraan penuh untuk keluarga kecil atau perjalanan dinas. Waktu berangkat, titik jemput, dan durasi istirahat sepenuhnya mengikuti kebutuhan Anda.",
    highlights: [
      "Satu kendaraan untuk Anda dan keluarga",
      "Penjemputan di alamat rumah atau hotel",
      "Driver bisa menunggu selama acara berlangsung",
    ],
    facilities: [
      "AC climate control",
      "USB charger",
      "Kursi kulit",
      "Air mineral",
      "Asuransi penuh",
      "Driver profesional",
    ],
    bestFor: ["Keluarga 4–6 orang", "Perjalanan dinas", "City tour"],
    theme: "ink",
    popular: true,
  },
  {
    slug: "avanza",
    name: "Avanza",
    brand: "Toyota",
    category: "MPV harian",
    tagline: "Untuk perjalanan singkat yang tidak mau ribet.",
    seats: 5,
    luggage: 3,
    seatPrice: null,
    charterPrice: 1_100_000,
    layout: "2–3",
    description:
      "Pilihan hemat untuk perjalanan dalam kota, antar bandara, atau rute pendek seperti Jakarta–Bandung. Nyaman untuk lima orang dengan bagasi yang cukup untuk perjalanan 1–2 hari.",
    highlights: [
      "Biaya paling ringan untuk kendaraan privat",
      "Lincah di jalan tol maupun dalam kota",
      "Cocok untuk antar-jemput bandara",
    ],
    facilities: [
      "AC",
      "USB charger",
      "Air mineral",
      "Asuransi penumpang",
      "Driver profesional",
    ],
    bestFor: ["Antar-jemput bandara", "Perjalanan 1–2 hari", "Keluarga kecil"],
    theme: "sky",
  },
];

export function getFleet(slug: string) {
  return fleet.find((item) => item.slug === slug);
}
