import { ImageResponse } from "next/og";

export const alt = "ElyraOs - Adaptive technology. Human focus. Endless flow.";
export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

function ElyraOsMark() {
  return (
    <svg width="310" height="310" viewBox="0 0 220 220" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="og-core" x1="38" y1="42" x2="184" y2="182" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9eeaff" />
          <stop offset="0.45" stopColor="#5fb6ff" />
          <stop offset="1" stopColor="#b86cff" />
        </linearGradient>
        <linearGradient id="og-edge" x1="44" y1="46" x2="184" y2="178" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#74dcff" />
          <stop offset="0.72" stopColor="#a992ff" />
          <stop offset="1" stopColor="#fff0ff" />
        </linearGradient>
        <filter id="og-glow" x="-70%" y="-80%" width="240%" height="260%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.28 0 0 0 0 0.72 0 0 0 0 1 0 0 0 0.9 0"
            result="blueGlow"
          />
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" result="softGraphic" />
          <feMerge>
            <feMergeNode in="blueGlow" />
            <feMergeNode in="softGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M111 34C68 34 35 68 35 111C35 154 68 186 111 186C154 186 186 154 186 111C186 68 154 34 111 34Z"
        fill="none"
        stroke="url(#og-core)"
        strokeWidth="30"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.76"
        filter="url(#og-glow)"
      />
      <path
        d="M111 34C68 34 35 68 35 111C35 154 68 186 111 186C154 186 186 154 186 111C186 68 154 34 111 34Z"
        fill="none"
        stroke="url(#og-edge)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.98"
      />
      <path
        d="M65 142C74 119 101 113 126 104C154 94 167 74 154 55C176 72 181 105 162 128C140 155 99 156 65 142Z"
        fill="none"
        stroke="url(#og-core)"
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.72"
        filter="url(#og-glow)"
      />
      <path
        d="M65 142C74 119 101 113 126 104C154 94 167 74 154 55"
        fill="none"
        stroke="url(#og-edge)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.98"
      />
    </svg>
  );
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 34% 31%, rgba(75, 178, 255, 0.24), transparent 260px), radial-gradient(circle at 66% 31%, rgba(179, 105, 255, 0.24), transparent 270px), linear-gradient(180deg, #000000 0%, #02040a 48%, #000000 100%)",
          color: "white",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Arial, Helvetica, sans-serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            opacity: 0.35
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            transform: "translateY(-6px)"
          }}
        >
          <ElyraOsMark />
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              fontSize: 86,
              fontWeight: 300,
              letterSpacing: 36,
              paddingLeft: 36,
              lineHeight: 1,
              textShadow: "0 0 28px rgba(255,255,255,0.25)"
            }}
          >
            <span>ELYRA</span>
            <span style={{ color: "#8fb7ff", fontSize: 60, letterSpacing: 7, marginLeft: 20 }}>OS</span>
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 23,
              fontWeight: 500,
              letterSpacing: 11,
              paddingLeft: 11,
              color: "#abdfff",
              backgroundImage: "linear-gradient(90deg, #aeeaff, #9eb9ff 48%, #d49bff)",
              backgroundClip: "text"
            }}
          >
            ADAPTIVE TECHNOLOGY. HUMAN FOCUS. ENDLESS FLOW.
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 29,
              color: "rgba(245, 250, 255, 0.82)",
              letterSpacing: 1.2
            }}
          >
            The cognitive layer for macOS.
          </div>
        </div>
      </div>
    ),
    size
  );
}
