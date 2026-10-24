export type Testimonial = {
  name: string;
  initials: string;
  route: string;
  quote: string;
  meta: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Rani Kusuma",
    initials: "RK",
    route: "Jakarta → Yogyakarta",
    quote:
      "Berangkat jam 6 pagi, sampai Jogja jam 3 sore. Kursinya lega, driver-nya sabar dan hafal jalan alternatif saat macet di Cikampek. Ini pertama kalinya saya naik travel dan tidak pegal.",
    meta: "Hiace Premio · 2 penumpang",
  },
  {
    name: "Aditya Pratama",
    initials: "AP",
    route: "Jakarta → Bandung",
    quote:
      "Pesan jam 9 malam untuk keberangkatan besok pagi, dibalas dalam 10 menit. Titik jemput di depan apartemen, tidak perlu ke terminal. Harga sesuai yang tertera di web.",
    meta: "Hiace Commuter · 1 penumpang",
  },
  {
    name: "Keluarga Hardjono",
    initials: "KH",
    route: "Jakarta → Semarang",
    quote:
      "Kami 16 orang, semuanya masuk satu Elf. Anak-anak bisa tidur nyaman, koper besar juga masuk. Admin-nya membantu mengatur jadwal istirahat supaya tidak terlalu lama di jalan.",
    meta: "Elf Long · 16 penumpang",
  },
  {
    name: "Sinta Maharani",
    initials: "SM",
    route: "Sewa penuh · Bandung",
    quote:
      "Sewa Innova untuk acara keluarga tiga hari. Driver datang lebih awal, sabar menunggu, dan tahu tempat makan yang enak di rute. Rasanya seperti punya sopir sendiri.",
    meta: "Innova Zenix · sewa harian",
  },
];

export const stats = [
  { value: "9 tahun", label: "Melayani rute antar kota" },
  { value: "38 armada", label: "Dengan perawatan berkala" },
  { value: "120.000+", label: "Penumpang sejak 2016" },
  { value: "4,9/5", label: "Dari 1.240 ulasan pelanggan" },
];
