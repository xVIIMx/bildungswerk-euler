"use client";

import { useEffect } from "react";

export default function ButArPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || "KEINCODE";
    const redirectUrl = `/but-check?ref=${encodeURIComponent(
      ref
    )}&lang=ar#but-generator`;

    window.location.replace(redirectUrl);
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
      dir="rtl"
    >
      <div>
        <h1 style={{ fontSize: "32px", marginBottom: "16px" }}>
          لحظة من فضلك…
        </h1>
        <p style={{ fontSize: "18px", lineHeight: 1.8 }}>
          سيتم توجيهك مباشرة إلى النموذج.
        </p>
      </div>
    </main>
  );
}
