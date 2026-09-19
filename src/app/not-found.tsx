import Link from "next/link";

/** Shown for paths that never reach a locale segment. */
export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme="light">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f7f4ee",
          color: "#14171a",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 400, margin: 0 }}>Off the map</h1>
          <p style={{ color: "#56615b", marginTop: "0.75rem" }}>
            This page does not exist.
          </p>
          <Link
            href="/en"
            style={{
              display: "inline-block",
              marginTop: "1.5rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "999px",
              background: "#1b3a2f",
              color: "#f3f1e9",
              textDecoration: "none",
            }}
          >
            Back home
          </Link>
        </div>
      </body>
    </html>
  );
}
