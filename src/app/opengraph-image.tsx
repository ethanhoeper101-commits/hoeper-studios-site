import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Hoeper Studios — Web design for local businesses in Star, Idaho";
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
          padding: "80px",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(120% 90% at 50% -10%, rgba(201,168,76,0.22) 0%, transparent 55%), radial-gradient(80% 80% at 90% 110%, rgba(201,168,76,0.12) 0%, transparent 60%)",
          color: "#ffffff",
        }}
      >
        {/* top kicker */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            color: "#C9A84C",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.28em",
          }}
        >
          <div style={{ display: "flex", width: 56, height: 2, backgroundColor: "#C9A84C" }} />
          WEB DESIGN · STAR, IDAHO
        </div>

        {/* headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          <div style={{ display: "flex" }}>Websites that win</div>
          <div style={{ display: "flex", color: "#E2C97E" }}>more local jobs.</div>
        </div>

        {/* footer row */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div style={{ display: "flex", width: "100%", height: 1, backgroundColor: "rgba(201,168,76,0.4)" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 32,
            }}
          >
            <div style={{ display: "flex", fontWeight: 700, color: "#C9A84C" }}>
              Hoeper Studios
            </div>
            <div style={{ display: "flex", color: "rgba(255,255,255,0.6)", fontSize: 26 }}>
              hoeperstudio.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
