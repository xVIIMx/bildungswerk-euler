"use client";

import { useEffect } from "react";

export default function ButArPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || "KEINCODE";

    const webhook =
      "https://script.google.com/macros/s/AKfycbxQ3r6zHZyseqK25H3lBizF2HiPsHIwt5bbfJqFr0JOIkU0ChXjw9HSyrBpbfPBriVXwg/exec";

    async function run() {
      try {
        await fetch(`${webhook}?ref=${encodeURIComponent(ref + "-AR")}`, {
          method: "GET",
          mode: "no-cors",
        });
      } catch {}

      const message =
        "مرحباً، رأيت الإعلان وأرغب في معرفة ما إذا كان طفلي مؤهلاً للحصول على دروس دعم مجانية.\n\n" +
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
      dir="rtl"
    >
      <div>
        <h1 style={{ fontSize: "32px", marginBottom: "16px" }}>
          لحظة من فضلك…
        </h1>
        <p style={{ fontSize: "18px", lineHeight: 1.8 }}>
          سيتم تحويلك مباشرة إلى واتساب.
        </p>
      </div>
    </main>
  );
}