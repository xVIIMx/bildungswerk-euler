"use client";

import { useEffect } from "react";

export default function ButDePage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || "KEINCODE";

    const webhook =
      "https://script.google.com/macros/s/AKfycbxQ3r6zHZyseqK25H3lBizF2HiPsHIwt5bbfJqFr0JOIkU0ChXjw9HSyrBpbfPBriVXwg/exec";

    async function run() {
      try {
        await fetch(`${webhook}?ref=${encodeURIComponent(ref + "-DE")}`, {
          method: "GET",
          mode: "no-cors",
        });
      } catch {}

      const message =
        "Hallo, ich habe Ihren Flyer gesehen und möchte prüfen, ob mein Kind Anspruch auf kostenlose Nachhilfe hat.\n\n" +
        ref;

      const phone = "4915256075324";
      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      window.location.replace(whatsappUrl);
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
          Sie werden direkt zu WhatsApp weitergeleitet.
        </p>
      </div>
    </main>
  );
}