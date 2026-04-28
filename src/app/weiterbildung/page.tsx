"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function WeiterbildungPage() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const contactRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const whatsappMessage =
    "Hallo, ich interessiere mich für die AEVO-Vorbereitung / berufliche Weiterbildung beim Bildungswerk Euler.";

  const whatsappUrl = `https://api.whatsapp.com/send?phone=4915256075324&text=${encodeURIComponent(
    whatsappMessage
  )}`;

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

  return (
    <main>
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
          <Link href="/but-check">BuT</Link>
          <Link href="/studenten">Studenten</Link>
          <Link href="/weiterbildung">Weiterbildung</Link>
          <Link href="/kurse">Kurse</Link>
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

      <section className="university-hero">
        <div className="university-hero__overlay">
          <div className="university-hero__content">
            <div className="university-hero__card">
              <p className="university-hero__eyebrow">
                Berufliche Weiterbildung
              </p>
              <h1>AEVO, Fachwirt, Betriebswirt & Meisterprüfung.</h1>
              <p className="university-hero__text">
                Strukturierte Vorbereitung auf Kammerprüfungen und berufliche
                Aufstiegsfortbildungen, verständlich, prüfungsnah und
                zielorientiert.
              </p>

              <div className="university-hero__actions">
                <a href="#kontakt" className="btn btn-tertiary">
                  Beratung anfragen
                </a>
                <a href="#aevo" className="btn btn-secondary-dark">
                  AEVO ansehen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="university-benefits">
        <div className="university-section-header">
          <h2>Weiterbildung mit klarem Prüfungsziel</h2>
          <p>
            Viele berufliche Abschlüsse folgen festen Prüfungsordnungen. Genau
            deshalb braucht Vorbereitung Struktur, Wiederholung und einen klaren
            Blick auf das, was in der Prüfung wirklich zählt.
          </p>
          <div className="university-section-line"></div>
        </div>

        <div className="university-benefits__grid">
          <div className="university-benefit-card">
            <h3>Prüfungsnah</h3>
            <p>
              Wir richten die Vorbereitung an typischen Prüfungsanforderungen,
              Aufgabenformaten und mündlichen Prüfungssituationen aus.
            </p>
          </div>

          <div className="university-benefit-card">
            <h3>Verständlich</h3>
            <p>
              Komplexe Inhalte werden in klare Schritte zerlegt, damit du nicht
              nur auswendig lernst, sondern wirklich verstehst.
            </p>
          </div>

          <div className="university-benefit-card">
            <h3>Strukturiert</h3>
            <p>
              Du bekommst einen klaren Lernweg, sinnvolle Reihenfolge und
              gezielte Unterstützung bis zur Prüfung.
            </p>
          </div>
        </div>
      </section>

      <section className="university-focus" id="aevo">
        <div className="university-focus__container">
          <div className="university-focus__left">
            <h2>Start mit AEVO / Ausbilderschein</h2>
            <p>
              Der Ausbilderschein ist für viele der erste wichtige Schritt, um
              im Unternehmen mehr Verantwortung zu übernehmen und offiziell
              ausbilden zu dürfen.
            </p>
            <p>
              Unsere AEVO-Vorbereitung richtet sich an Menschen, die sich
              gezielt auf die Prüfung bei der IHK oder Handwerkskammer
              vorbereiten möchten.
            </p>

            <ul className="university-list">
              <li>Vorbereitung auf die schriftliche AEVO-Prüfung</li>
              <li>Vorbereitung auf die praktische Prüfung</li>
              <li>Aufbau der Präsentation oder Unterweisung</li>
              <li>Verständliche Erklärung der wichtigsten Inhalte</li>
              <li>Gezielte Unterstützung bei Unsicherheiten</li>
            </ul>
          </div>

          <div className="university-note-card">
            <h3>Für wen ist AEVO geeignet?</h3>
            <p>
              Für angehende Ausbilder, Fachkräfte, Selbstständige,
              Führungskräfte und alle, die künftig Auszubildende fachlich und
              pädagogisch begleiten möchten.
            </p>
          </div>
        </div>
      </section>

      <section className="finish-line">
        <div className="finish-line__box">
          <div className="finish-line__left">
            <h3>Weitere Kurse folgen Schritt für Schritt</h3>
            <p>
              Wir bauen den Bereich Weiterbildung bewusst sauber auf. Der erste
              Fokus liegt auf AEVO. Danach erweitern wir das Angebot um weitere
              Kammerprüfungen und Aufstiegsfortbildungen.
            </p>
          </div>

          <div className="finish-line__right">
            <div className="finish-line__item">
              Fachwirt-Vorbereitung für IHK-Prüfungen
            </div>
            <div className="finish-line__item">
              Betriebswirt-Vorbereitung für berufliche Aufstiegsfortbildungen
            </div>
            <div className="finish-line__item">
              Meistervorbereitung für Handwerkskammer und Industrie
            </div>
            <div className="finish-line__item">
              Individuelle Prüfungsvorbereitung für berufliche Abschlüsse
            </div>
          </div>
        </div>
      </section>

      <section className="university-contact" id="kontakt">
        <div className="university-contact__box">
          <h2>Interesse an AEVO oder Weiterbildung?</h2>
          <p>
            Schreib uns kurz, welchen Abschluss du vorbereiten möchtest. Wir
            besprechen dann gemeinsam, ob und wie wir dich sinnvoll unterstützen
            können.
          </p>

          <div className="university-contact__actions">
            <a href="tel:+4915256075324" className="btn btn-primary">
              Jetzt anrufen
            </a>

            <a href={whatsappUrl} className="btn btn-secondary-dark">
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
        <p>Nachhilfe · Weiterbildung · Prüfungsvorbereitung</p>
        <p className="footer__legal">
          © 2026 Bildungswerk Euler · <a href="/impressum">Impressum</a> ·{" "}
          <a href="/datenschutz">Datenschutz</a>
        </p>
      </footer>

      <div className="floating-contact" ref={contactRef}>
        <button
          className="floating-contact__button"
          onClick={() => setContactOpen(!contactOpen)}
        >
          Jetzt beraten lassen!
        </button>

        {contactOpen && (
          <div className="floating-contact__menu">
            <a href="tel:+4915256075324">📞 Anrufen</a>
            <a href={whatsappUrl}>💬 WhatsApp</a>
            <a href="mailto:info@bildungswerkeuler.de">✉️ E-Mail</a>
          </div>
        )}
      </div>
    </main>
  );
}
