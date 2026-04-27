"use client";

import { PDFDocument, rgb } from "pdf-lib";

export default function TestPDFPage() {
  async function generateTest() {
    const existingPdfBytes = await fetch(
      "/but-wiesbaden-bestaetigung-der-schule.pdf"
    ).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const page = pdfDoc.getPages()[0];

    // 🔥 HIER POSITION TESTEN
    page.drawText("NAME TEST", {
      x: 195,
      y: 660,
      size: 12,
      color: rgb(1, 0, 0), // rot
    });

    // 🔥 GEBURTSDATUM TEST
    page.drawText("01.01.2015", {
      x: 195,
      y: 630,
      size: 12,
      color: rgb(0, 0, 1), // blau
    });

    // 🔥 JAHRGANGSSTUFE / KLASSE TEST
    page.drawText("7b", {
      x: 195,
      y: 607,
      size: 12,
      color: rgb(0, 0.6, 0), // grün
    });

    // 🔥 AKTENZEICHEN TEST
    page.drawText("12345", {
      x: 195,
      y: 580,
      size: 12,
      color: rgb(0.6, 0, 0.6), // lila
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    window.open(url);
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>PDF Test</h1>
      <button onClick={generateTest}>PDF generieren</button>
    </main>
  );
}
