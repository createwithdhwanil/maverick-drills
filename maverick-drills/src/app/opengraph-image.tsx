import { ImageResponse } from "next/og";

export const alt = "Maverick Drills — Beyond the Game";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        padding: "65px 72px",
        backgroundColor: "#0B0D10",
        color: "#FFFFFF",
      }}
    >
      {/* Crimson atmospheric bloom */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: 9999,
          right: -250,
          top: -320,
          background:
            "radial-gradient(circle, rgba(229,9,36,0.34), transparent 70%)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            fontWeight: 900,
            fontSize: 32,
            letterSpacing: -1.5,
          }}
        >
          <span>MAVERICK </span>
          <span style={{ color: "#E50924", marginLeft: 9 }}>DRILLS</span>
        </div>

        <div
          style={{
            color: "#E50924",
            fontSize: 15,
            letterSpacing: 4,
            fontWeight: 700,
          }}
        >
          MD / GAMING
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: -6,
          }}
        >
          BEYOND THE
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 148,
            fontWeight: 900,
            color: "#E50924",
            lineHeight: 1,
            letterSpacing: -8,
          }}
        >
          GAME.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 30,
            color: "#A9AFBC",
            fontSize: 19,
            letterSpacing: 2,
          }}
        >
          CINEMATIC GAMEPLAY / ORIGINALS / DISCOVERY
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: 190,
          height: 4,
          backgroundColor: "#E50924",
        }}
      />
    </div>,
    size,
  );
}
