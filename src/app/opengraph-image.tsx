import { ImageResponse } from "next/og";

export const alt = "Rute Nusa — travel mobil antar kota tanpa drama di jalan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f2e8",
          padding: "64px 72px 48px",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 16,
              background: "#101e26",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f7f2e8",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            RN
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{ fontSize: 27, fontWeight: 700, color: "#101e26" }}
            >
              Rute Nusa
            </span>
            <span
              style={{
                fontSize: 12,
                letterSpacing: 5,
                color: "#101e2677",
                fontWeight: 600,
              }}
            >
              TRAVEL ANTAR KOTA
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 78,
              lineHeight: 1.02,
              color: "#101e26",
              fontWeight: 600,
              letterSpacing: -3,
            }}
          >
            Tiba di tujuan,
          </span>
          <span
            style={{
              fontSize: 78,
              lineHeight: 1.08,
              color: "#c94f27",
              fontWeight: 600,
              letterSpacing: -3,
              fontStyle: "italic",
            }}
          >
            tanpa drama di jalan.
          </span>
          <span
            style={{
              marginTop: 26,
              fontSize: 24,
              color: "#101e2699",
              maxWidth: 800,
            }}
          >
            Travel mobil antar kota · Jadwal pasti · Pemesanan langsung via
            WhatsApp
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #e2d8c6",
            paddingTop: 24,
          }}
        >
          <span style={{ fontSize: 20, color: "#101e2688" }}>
            Jakarta · Bandung · Yogyakarta · Surabaya
          </span>
          <span
            style={{ fontSize: 20, fontWeight: 700, color: "#101e26" }}
          >
            rutenusa.id
          </span>
        </div>
      </div>
    ),
    size,
  );
}
