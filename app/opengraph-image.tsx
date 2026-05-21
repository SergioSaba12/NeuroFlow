import { ImageResponse } from "next/og";

export const alt = "ElyraOs - Adapt your environment. Protect your mind.";
export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

function ElyraOsMark() {
  return (
    <svg width="390" height="300" viewBox="0 0 220 170" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="og-core" x1="18" y1="24" x2="198" y2="138" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9eeaff" />
          <stop offset="0.45" stopColor="#5fb6ff" />
          <stop offset="1" stopColor="#b86cff" />
        </linearGradient>
        <linearGradient id="og-edge" x1="25" y1="28" x2="205" y2="145" gradientUnits="userSpaceOnUse">
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
        d="M40 128V60C40 22 88 17 109 49L137 91C150 111 180 101 180 77V51"
        fill="none"
        stroke="url(#og-core)"
        strokeWidth="48"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.78"
        filter="url(#og-glow)"
      />
      <path
        d="M40 128V60C40 22 88 17 109 49L137 91C150 111 180 101 180 77V51"
        fill="none"
        stroke="url(#og-edge)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.98"
      />
      <path
        d="M54 124C54 105 66 96 81 100C95 104 99 121 88 134C77 147 54 143 54 124Z"
        fill="url(#og-core)"
        opacity="0.44"
      />
      <path
        d="M174 50C174 34 190 28 199 39C208 51 202 68 189 72"
        fill="none"
        stroke="#d7adff"
        strokeWidth="20"
        strokeLinecap="round"
        opacity="0.48"
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
              fontSize: 86,
              fontWeight: 300,
              letterSpacing: 36,
              paddingLeft: 36,
              lineHeight: 1,
              textShadow: "0 0 28px rgba(255,255,255,0.25)"
            }}
          >
            ELYRAOS
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
            ADAPT YOUR ENVIRONMENT. PROTECT YOUR MIND.
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
