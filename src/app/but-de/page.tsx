"use client";

import { useEffect } from "react";

export default function ButDePage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || "KEINCODE";

    async function run() {
      const redirectUrl = `/but-check?ref=${encodeURIComponent(
        ref
      )}&lang=de#but-generator`;

      window.location.replace(redirectUrl);
    }

    run();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f3efe6",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ fontSize: "32px", marginBottom: "16px" }}>
          Einen Moment bitte …
        </h1>
        <p style={{ fontSize: "18px", lineHeight: 1.6 }}>
          Sie werden direkt zum Formular geführt.
        </p>
      </div>
    </main>
  );
}
