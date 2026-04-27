"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export default function ButCheckPage() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [district, setDistrict] = useState("wiesbaden");
  const [selectedBenefit, setSelectedBenefit] = useState("");
  const [childName, setChildName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [schoolClass, setSchoolClass] = useState("");
  const [aktenzeichen, setAktenzeichen] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [refCode, setRefCode] = useState("KEINCODE");
  const [languageCode, setLanguageCode] = useState("de");
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRefCode(params.get("ref") || "KEINCODE");
    setLanguageCode(params.get("lang") || "de");
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const districtLabel = useMemo(() => {
    if (district === "wiesbaden") return "Wiesbaden";
    if (district === "mainz") return "Mainz";
    if (district === "mtk") return "Main-Taunus-Kreis";
    return "Wiesbaden";
  }, [district]);

  const formEnabled = !!selectedBenefit;

  function trackButEvent(params: {
    ref: string;
    name?: string;
    birth?: string;
    klasse?: string;
    aktenzeichen?: string;
  }) {
    const webhook =
      "https://script.google.com/macros/s/AKfycbz2G5C_nrWrsQDnUqVbgCLmSjiExomni2wtk9opz1ZbNAq_Wmt7gYC25jOyM7nsqBFy/exec";

    const query = new URLSearchParams({
      ref: params.ref,
      name: params.name || "",
      birth: params.birth || "",
      class: params.klasse || "",
      aktenzeichen: params.aktenzeichen || "",
    });

    const trackingUrl = `${webhook}?${query.toString()}`;

    try {
      fetch(trackingUrl, {
        method: "GET",
        mode: "no-cors",
        cache: "no-store",
        keepalive: true,
      });
    } catch {
      const img = new window.Image();
      img.src = trackingUrl;
    }
  }

  async function generatePdf() {
    if (!selectedBenefit) {
      alert(
        "Bitte wählen Sie zuerst aus, über welche Leistung Bildung und Teilhabe beantragt wird."
      );
      return;
    }

    if (!childName || !birthDate || !schoolClass) {
      alert("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }

    if (district !== "wiesbaden") {
      alert(
        `Für ${districtLabel} wird das Formular in Kürze freigeschaltet. Aktuell ist nur Wiesbaden verfügbar.`
      );
      return;
    }

    const normalizedLang = languageCode.toUpperCase();

    trackButEvent({
      ref: `${refCode}-${normalizedLang}`,
      name: childName,
      birth: birthDate,
      klasse: schoolClass,
      aktenzeichen,
    });

    try {
      setIsGenerating(true);

      const existingPdfBytes = await fetch(
        "/but-wiesbaden-bestaetigung-der-schule.pdf"
      ).then((res) => res.arrayBuffer());

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      const firstPage = pdfDoc.getPages()[0];

      firstPage.drawText(childName, {
        x: 195,
        y: 660,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(birthDate, {
        x: 195,
        y: 630,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(schoolClass, {
        x: 195,
        y: 607,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });

      if (aktenzeichen) {
        firstPage.drawText(aktenzeichen, {
          x: 195,
          y: 580,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const pdfArrayBuffer = pdfBytes.buffer.slice(
        pdfBytes.byteOffset,
        pdfBytes.byteOffset + pdfBytes.byteLength
      ) as ArrayBuffer;
      const blob = new Blob([pdfArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      window.open(url, "_blank", "noopener,noreferrer");

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 60000);
    } catch (error) {
      console.error(error);
      alert("Beim Erstellen der PDF ist ein Fehler aufgetreten.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <main className="but-page">
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <Link href="/" className="header__logo">
          <Image
            src="/logo.png"
            alt="Bildungswerk Euler Logo"
            width={180}
            height={60}
            unoptimized
          />
        </Link>

        <nav className="header__nav">
          <Link href="/">Bildungswerk Euler</Link>
          <Link href="/schueler">Schüler</Link>
          <Link href="/studenten">Studenten</Link>
        </nav>

        <div
          className="header__menu"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          ☰
        </div>
      </header>

      {open && (
        <div className="mobile-menu" ref={mobileMenuRef}>
          <Link href="/" onClick={() => setOpen(false)}>
            Bildungswerk Euler
          </Link>
          <Link href="/schueler" onClick={() => setOpen(false)}>
            Schüler
          </Link>
          <Link href="/studenten" onClick={() => setOpen(false)}>
            Studenten
          </Link>
        </div>
      )}

      <section className="but-hero">
        <div className="but-hero__overlay">
          <div className="but-hero__content">
            <div className="but-hero__card">
              <p className="but-hero__eyebrow">Bildung und Teilhabe</p>
              <h1>Kostenlose Nachhilfe prüfen</h1>
              <p className="but-hero__text">
                Wenn Sie Bürgergeld, Wohngeld, Kinderzuschlag oder Sozialhilfe
                beziehen, kann schulische Lernförderung in vielen Fällen
                vollständig übernommen werden.
              </p>
              <div className="but-hero__actions">
                <a href="#but-generator" className="btn btn-primary">
                  Jetzt Formular vorbereiten
                </a>
                <a
                  href="https://wa.me/4915256075324"
                  className="btn btn-secondary-dark"
                >
                  WhatsApp öffnen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="but-info">
        <div className="but-section-header">
          <h2>So funktioniert es</h2>
          <p>
            Wir vereinfachen den Einstieg so weit wie möglich. Sie füllen nur
            die Grunddaten aus, wir bereiten das offizielle Formular vor und den
            Rest des Ablaufs begleiten wir mit Ihnen gemeinsam.
          </p>
          <div className="but-section-line"></div>
        </div>

        <div className="but-steps">
          <div className="but-step-card">
            <h3>1. Daten eingeben</h3>
            <p>
              Wählen Sie Ihren Bezirk, die passende Leistungsart und tragen Sie
              die Grunddaten Ihres Kindes ein.
            </p>
          </div>

          <div className="but-step-card">
            <h3>2. PDF herunterladen</h3>
            <p>
              Sie erhalten die passende Vorlage bereits vorausgefüllt und sparen
              sich unnötige Rückfragen und manuelle Vorarbeit.
            </p>
          </div>

          <div className="but-step-card">
            <h3>3. Schule ausfüllen lassen</h3>
            <p>
              Die Lehrkraft ergänzt nur noch den schulischen Teil und bestätigt,
              dass die Lernförderung zusätzlich erforderlich ist.
            </p>
          </div>

          <div className="but-step-card">
            <h3>4. Uns zuschicken</h3>
            <p>
              Senden Sie uns das unterschriebene Formular per WhatsApp. Den
              weiteren Ablauf übernehmen wir gemeinsam mit Ihnen.
            </p>
          </div>
        </div>
      </section>

      <section className="but-generator" id="but-generator">
        <div className="but-generator__box">
          <p className="but-generator__eyebrow">Formular-Generator</p>
          <h2>Formular zur Lernförderung vorbereiten</h2>
          <p className="but-generator__intro">
            Wählen Sie zuerst Ihren Bezirk und die passende Leistungsart aus.
            Anschließend erstellen wir Ihnen daraus die offizielle Vorlage
            bereits vorausgefüllt.
          </p>

          <div className="but-generator__top">
            <label className="but-field">
              <span>Bezirk / Stadt</span>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                style={inputStyle}
              >
                <option value="wiesbaden">Wiesbaden</option>
                <option value="mainz">Mainz</option>
                <option value="mtk">Main-Taunus-Kreis</option>
              </select>
            </label>

            <div className="but-eligibility">
              <span className="but-eligibility__title">
                Voraussetzung für Bildung und Teilhabe
              </span>
              <p className="but-eligibility__text">
                Bitte wählen Sie aus, welche Leistung Sie aktuell beziehen. Ohne
                eine dieser Leistungen ist eine BuT-Lernförderung in der Regel
                nicht möglich.
              </p>

              <div className="but-benefit-grid">
                <button
                  type="button"
                  onClick={() => setSelectedBenefit("bürgergeld")}
                  style={benefitButtonStyle(selectedBenefit === "bürgergeld")}
                >
                  Bürgergeld (Jobcenter)
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedBenefit("wohngeld")}
                  style={benefitButtonStyle(selectedBenefit === "wohngeld")}
                >
                  Wohngeld
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedBenefit("kinderzuschlag")}
                  style={benefitButtonStyle(
                    selectedBenefit === "kinderzuschlag"
                  )}
                >
                  Kinderzuschlag
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedBenefit("sozialhilfe")}
                  style={benefitButtonStyle(selectedBenefit === "sozialhilfe")}
                >
                  Sozialhilfe
                </button>
              </div>
            </div>
          </div>

          <div className="but-fields">
            <label className="but-field">
              <span>Name des Kindes</span>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                disabled={!formEnabled}
                placeholder="z. B. Max Mustermann"
                style={inputStyle}
              />
            </label>

            <label className="but-field">
              <span>Geburtsdatum</span>
              <input
                type="text"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                disabled={!formEnabled}
                placeholder="z. B. 01.01.2015"
                style={inputStyle}
              />
            </label>

            <label className="but-field">
              <span>Jahrgangsstufe / Klasse</span>
              <input
                type="text"
                value={schoolClass}
                onChange={(e) => setSchoolClass(e.target.value)}
                disabled={!formEnabled}
                placeholder="z. B. 7b"
                style={inputStyle}
              />
            </label>

            <label className="but-field">
              <span>Aktenzeichen (optional)</span>
              <input
                type="text"
                value={aktenzeichen}
                onChange={(e) => setAktenzeichen(e.target.value)}
                disabled={!formEnabled}
                placeholder="Kann nachgereicht werden"
                style={inputStyle}
              />
            </label>
          </div>

          <div className="but-generator__actions">
            <button
              onClick={generatePdf}
              disabled={isGenerating || !formEnabled}
              style={{
                ...buttonStyle,
                background: "#111",
                color: "#fff",
                cursor: isGenerating
                  ? "wait"
                  : !formEnabled
                  ? "not-allowed"
                  : "pointer",
                opacity: isGenerating || !formEnabled ? 0.75 : 1,
              }}
            >
              {isGenerating ? "PDF wird erstellt ..." : "Formular erstellen"}
            </button>

            <a
              href="https://wa.me/4915256075324"
              onClick={() => {
                const normalizedLang = languageCode.toUpperCase();
                trackButEvent({
                  ref: `${refCode}-${normalizedLang}`,
                });
              }}
              style={{
                ...buttonStyle,
                background: "#e9e1d6",
                color: "#111",
                textDecoration: "none",
              }}
            >
              WhatsApp öffnen
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Bildungswerk Euler</p>
        <p>Nachhilfe · Ausbildungsprogramme · Kurse</p>
        <p className="footer__legal">
          © 2026 Bildungswerk Euler · <Link href="/impressum">Impressum</Link> ·{" "}
          <Link href="/datenschutz">Datenschutz</Link>
        </p>
      </footer>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  height: "52px",
  padding: "0 14px",
  border: "1px solid #d8cfc2",
  background: "#fff",
  fontSize: "16px",
  outline: "none",
  width: "100%",
};

const buttonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "52px",
  padding: "0 22px",
  border: "none",
  fontSize: "15px",
  fontWeight: 600,
};

function benefitButtonStyle(isActive: boolean): React.CSSProperties {
  return {
    minHeight: "62px",
    padding: "14px 16px",
    border: `1px solid ${isActive ? "#111" : "#d8cfc2"}`,
    background: isActive ? "#111" : "#f8f5ef",
    color: isActive ? "#fff" : "#111",
    fontSize: "15px",
    fontWeight: 600,
    textAlign: "left",
    cursor: "pointer",
  };
}
