"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export default function SchuelerPage() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [district, setDistrict] = useState("wiesbaden");
  const [selectedBenefit, setSelectedBenefit] = useState("");
  const [childName, setChildName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [schoolClass, setSchoolClass] = useState("");
  const [aktenzeichen, setAktenzeichen] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (contactRef.current && !contactRef.current.contains(target)) {
        setContactOpen(false);
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formEnabled = !!selectedBenefit;
  const whatsappClaimMessage =
    "Hallo, ich möchte meinen Anspruch auf kostenlose Nachhilfe prüfen lassen.";
  const whatsappClaimUrl = `https://api.whatsapp.com/send?phone=4915256075324&text=${encodeURIComponent(
    whatsappClaimMessage
  )}`;

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
        "Für diesen Bezirk wird das Formular in Kürze freigeschaltet. Aktuell ist nur Wiesbaden verfügbar."
      );
      return;
    }

    trackButEvent({
      ref: "SCHUELER-DE",
      name: childName,
      birth: birthDate,
      klasse: schoolClass,
      aktenzeichen,
    });

    try {
      setIsGenerating(true);

      const existingPdfBytes = await fetch(
        `/but-wiesbaden-bestaetigung-der-schule.pdf?v=${Date.now()}`,
        { cache: "no-store" }
      ).then((res) => res.arrayBuffer());

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const firstPage = pdfDoc.getPages()[1];

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
    <main>
      <header
        className={`header header--dark ${scrolled ? "header--scrolled" : ""}`}
      >
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
          <Link href="/but-check">BuT</Link>
          <Link href="/studenten">Studenten</Link>
          <Link href="/weiterbildung">Weiterbildung</Link>
          <Link href="/kurse">Kurse</Link>
        </nav>

        <div className="header__menu" onClick={() => setOpen((prev) => !prev)}>
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
          <Link href="/but-check" onClick={() => setOpen(false)}>
            BuT
          </Link>
          <Link href="/studenten" onClick={() => setOpen(false)}>
            Studenten
          </Link>
          <Link href="/weiterbildung" onClick={() => setOpen(false)}>
            Weiterbildung
          </Link>
          <Link href="/kurse" onClick={() => setOpen(false)}>
            Kurse
          </Link>
        </div>
      )}
      <section className="student-hero">
        <div className="student-hero__overlay">
          <div className="student-hero__content">
            <div className="student-hero__card">
              <p className="student-hero__eyebrow">Für Schüler</p>

              <h1>Nachhilfe, die wirklich wirkt.</h1>

              <p className="student-hero__text">
                Individuelle Förderung, klare Erklärungen und nachhaltige
                Verbesserungen für bessere Noten, mehr Verständnis und mehr
                Sicherheit im Schulalltag.
              </p>

              <div className="student-hero__actions">
                <a href="#kontakt" className="btn btn-tertiary">
                  Beratungsgespräch vereinbaren
                </a>
                <a href="#but" className="btn btn-tertiary">
                  Anspruch auf kostenlose Nachhilfe prüfen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="student-benefits">
        <div className="student-section-header">
          <h2>Was Schüler bei uns bekommen</h2>
          <p>
            Keine Nachhilfe von der Stange, sondern strukturierte Unterstützung,
            die auf Verständnis, Stabilität und langfristigen Lernerfolg
            ausgerichtet ist.
          </p>
          <div className="student-section-line"></div>
        </div>

        <div className="student-benefits__grid">
          <div className="student-benefit-card">
            <h3>Verständliche Erklärungen</h3>
            <p>
              Komplexe Inhalte werden so aufbereitet, dass sie wirklich
              verstanden werden, statt nur kurzfristig auswendig gelernt zu
              werden.
            </p>
          </div>

          <div className="student-benefit-card">
            <h3>Individuelle Förderung</h3>
            <p>
              Unterricht und Lernstrategie richten sich nach dem tatsächlichen
              Stand, den Lücken und den Zielen des jeweiligen Schülers.
            </p>
          </div>

          <div className="student-benefit-card">
            <h3>Nachhaltige Verbesserung</h3>
            <p>
              Unser Ziel sind nicht nur bessere Noten, sondern mehr
              Selbstvertrauen, mehr Klarheit und echte Stabilität im Lernen.
            </p>
          </div>
        </div>
      </section>
      <section className="student-subjects">
        <div className="student-subjects__container">
          <div className="student-subjects__left">
            <h2>Fächer und Unterstützung</h2>
            <p>
              Wir begleiten Schüler in zentralen Schulfächern und helfen dort,
              wo Verständnislücken, Prüfungsdruck oder Motivationsprobleme
              entstehen.
            </p>

            <ul className="student-list">
              <li>Mathematik</li>
              <li>Deutsch</li>
              <li>Englisch</li>
              <li>Naturwissenschaften</li>
              <li>Prüfungsvorbereitung</li>
              <li>Lernstruktur und Aufarbeitung von Lücken</li>
            </ul>
          </div>

          <div className="student-subjects__right">
            <div className="student-note-card">
              <h3>Für wen ist das geeignet?</h3>
              <p>
                Für Schüler, die ihre Leistungen gezielt verbessern wollen, für
                Familien mit akutem Förderbedarf und für Lernende, die mehr
                Klarheit und Struktur im Schulstoff brauchen.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="student-but" id="but">
        <div className="student-section-header">
          <h2>Hat Ihr Kind Anspruch auf kostenlose Nachhilfe?</h2>
          <p>
            Viele Familien haben Anspruch, oft ohne es zu wissen. In vielen
            Fällen übernimmt der Staat die Kosten vollständig.
          </p>
          <div className="student-section-line"></div>
        </div>

        <div className="student-but__box">
          <div className="student-but__list">
            <div className="student-but__item">Bürgergeld</div>
            <div className="student-but__item">Wohngeld</div>
            <div className="student-but__item">Kinderzuschlag</div>
            <div className="student-but__item">Sozialhilfe</div>
          </div>

          <div className="student-but__content">
            <p>
              Wir prüfen Ihren Anspruch kostenlos und unterstützen Sie bei der
              gesamten Abwicklung, damit Ihr Kind schnell und unkompliziert
              gefördert werden kann.
            </p>

            <a href="#but-generator" className="btn btn-primary">
              Kostenlosen Anspruch prüfen
            </a>
          </div>
        </div>
      </section>
      <section className="but-generator" id="but-generator">
        <div className="but-generator__box">
          <p className="but-generator__eyebrow">Bildung und Teilhabe</p>
          <h2>Sie haben zwei einfache Möglichkeiten</h2>
          <p className="but-generator__intro">
            Sie können uns direkt per WhatsApp kontaktieren, damit wir den
            Ablauf gemeinsam mit Ihnen prüfen. Oder Sie bereiten das
            Schulformular direkt selbst vor und senden es uns anschließend
            ausgefüllt zurück.
          </p>

          <div className="but-choice-boxes">
            <a href="#formular" className="but-choice-card">
              <span>Schnellste Methode</span>
              <strong>Jetzt Formular vorbereiten</strong>
              <small>
                Daten eintragen, PDF öffnen und direkt bei der Schule abgeben.
              </small>
            </a>

            <a
              href={whatsappClaimUrl}
              onClick={() => {
                trackButEvent({
                  ref: "SCHUELER-DE",
                });
              }}
              className="but-choice-card"
            >
              <span>Direkt über WhatsApp</span>
              <strong>Ich möchte Hilfe beim Ablauf</strong>
              <small>
                Schreiben Sie uns direkt. Wir prüfen gemeinsam, welche nächsten
                Schritte sinnvoll sind.
              </small>
            </a>
          </div>

          <div id="formular" className="but-generator__form-anchor">
            <h3>Formular vorbereiten</h3>
            <p>
              Wählen Sie zuerst Ihren Bezirk und die passende Leistungsart aus.
              Danach können Sie die Angaben Ihres Kindes eintragen.
            </p>
          </div>

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

          <p className="but-privacy-note">
            Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage zur
            Lernförderung verwendet. Nach Beendigung der Anfrage werden die
            Daten automatisch gelöscht.
          </p>

          <div className="but-generator__actions">
            <button
              onClick={generatePdf}
              disabled={isGenerating || !formEnabled}
              className="btn btn-tertiary but-action-button"
            >
              {isGenerating ? "PDF wird erstellt ..." : "Formular erstellen"}
            </button>

            <a
              href={whatsappClaimUrl}
              onClick={() => {
                trackButEvent({
                  ref: "SCHUELER-DE",
                });
              }}
              className="btn btn-whatsapp but-action-button"
            >
              WhatsApp öffnen
            </a>
          </div>
        </div>
      </section>
      <section className="student-contact" id="kontakt">
        <div className="student-contact__box">
          <h2>Beratungsgespräch vereinbaren</h2>
          <p>
            Wir besprechen gemeinsam die Situation Ihres Kindes, den
            Förderbedarf und die passende Form der Unterstützung.
          </p>

          <div className="student-contact__actions">
            <a href="tel:+4915256075324" className="btn btn-primary">
              Jetzt anrufen
            </a>

            <a
              href="https://wa.me/4915256075324"
              className="btn btn-secondary-dark"
            >
              WhatsApp schreiben
            </a>

            <a
              href="mailto:info@bildungswerkeuler.de"
              className="btn btn-tertiary"
            >
              E-Mail schreiben
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

      <div className="floating-contact" ref={contactRef}>
        <button
          className="floating-contact__button"
          onClick={() => setContactOpen((prev) => !prev)}
        >
          Jetzt beraten lassen!
        </button>
        {contactOpen && (
          <div className="floating-contact__menu">
            <a href="tel:+4915256075324">📞 Anrufen</a>
            <a href="https://wa.me/4915256075324">💬 WhatsApp</a>
            <a href="mailto:info@bildungswerkeuler.de">✉️ E-Mail</a>
          </div>
        )}
      </div>
    </main>
  );
}

const inputStyle: CSSProperties = {
  height: "52px",
  padding: "0 14px",
  border: "1px solid #d8cfc2",
  background: "#fff",
  fontSize: "16px",
  outline: "none",
  width: "100%",
};

function benefitButtonStyle(isActive: boolean): CSSProperties {
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
