"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function KursePage() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const contactRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const whatsappMessage =
    "Hallo, ich interessiere mich für Kurse beim Bildungswerk Euler.";

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
              <p className="university-hero__eyebrow">Kurse & Programme</p>
              <h1>Kurse für Menschen, Unternehmen und öffentliche Träger.</h1>
              <p className="university-hero__text">
                Von Office-Schulungen über Bewerbungstraining bis zu
                Coding-Camps, praxisnah, strukturiert und passend zur
                Zielgruppe.
              </p>

              <div className="university-hero__actions">
                <a href="#kontakt" className="btn btn-tertiary">
                  Kurs anfragen
                </a>
                <a href="#zielgruppen" className="btn btn-secondary-dark">
                  Angebote ansehen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="university-benefits" id="zielgruppen">
        <div className="university-section-header">
          <h2>Flexible Bildungsangebote für unterschiedliche Ziele</h2>
          <p>
            Unsere Kurse richten sich an Firmen, Privatpersonen und
            Bildungspartner, die klare, verständliche und praktisch nutzbare
            Lernangebote suchen.
          </p>
          <div className="university-section-line"></div>
        </div>

        <div className="university-benefits__grid">
          <div className="university-benefit-card">
            <h3>Für Unternehmen</h3>
            <p>
              Schulungen für Mitarbeitende, zum Beispiel Office, Excel, digitale
              Arbeitsprozesse, KI im Büro und interne Weiterbildungsformate.
            </p>
          </div>

          <div className="university-benefit-card">
            <h3>Für öffentliche Projekte</h3>
            <p>
              Kursformate für Träger, Schulen, Vereine und Förderprojekte, zum
              Beispiel Bewerbungstraining, digitale Grundbildung und
              Coding-Camps.
            </p>
          </div>

          <div className="university-benefit-card">
            <h3>Für Privatpersonen</h3>
            <p>
              Verständliche Kurse für Menschen, die neue Fähigkeiten lernen
              möchten, von Programmierung über Office bis zu
              Bewerbungsvorbereitung.
            </p>
          </div>
        </div>
      </section>

      <section className="university-focus">
        <div className="university-focus__container">
          <div className="university-focus__left">
            <h2>Praxisnah statt theoretisch überladen</h2>
            <p>
              Ein guter Kurs muss nicht kompliziert wirken. Entscheidend ist,
              dass die Teilnehmenden am Ende wirklich etwas können und sicherer
              im Umgang mit dem Thema werden.
            </p>
            <p>
              Deshalb setzen wir auf klare Strukturen, verständliche
              Erklärungen, sinnvolle Übungen und direkten Bezug zur Anwendung.
            </p>

            <ul className="university-list">
              <li>Office- und Excel-Kurse für Firmen und Einzelpersonen</li>
              <li>Bewerbungstraining und berufliche Orientierung</li>
              <li>
                Coding-Kurse und Coding-Camps für Jugendliche und Erwachsene
              </li>
              <li>Digitale Grundbildung und Medienkompetenz</li>
              <li>Individuelle Kurskonzepte für Gruppen und Projekte</li>
            </ul>
          </div>

          <div className="university-note-card">
            <h3>Modular aufgebaut</h3>
            <p>
              Kurse können als Einzeltermine, kompakte Workshops, mehrwöchige
              Programme oder projektbezogene Angebote geplant werden.
            </p>
          </div>
        </div>
      </section>

      <section className="finish-line">
        <div className="finish-line__box">
          <div className="finish-line__left">
            <h3>Aktuelle Kursrichtungen</h3>
            <p>
              Der Kursbereich wird Schritt für Schritt erweitert. Zum Start
              konzentrieren wir uns auf Themen mit hohem praktischen Nutzen für
              Beruf, Schule, Alltag und digitale Zukunft.
            </p>
          </div>

          <div className="finish-line__right">
            <div className="finish-line__item">
              Office & Excel, für Unternehmen, Teams und Privatpersonen
            </div>
            <div className="finish-line__item">
              Bewerbungstraining, für Einzelpersonen, Gruppen und Förderprojekte
            </div>
            <div className="finish-line__item">
              Coding & digitale Kompetenzen, als Kurs oder Camp
            </div>
            <div className="finish-line__item">
              Individuelle Bildungsprogramme für öffentliche Träger und Partner
            </div>
          </div>
        </div>
      </section>

      <section className="university-contact" id="kontakt">
        <div className="university-contact__box">
          <h2>Sie möchten einen Kurs anfragen?</h2>
          <p>
            Schreiben Sie uns kurz, für wen der Kurs gedacht ist und welches
            Ziel erreicht werden soll. Wir prüfen dann, welches Format am besten
            passt.
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
        <p>Nachhilfe · Weiterbildung · Kurse</p>
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
            <a href={whatsappUrl}>💬 WhatsApp</a>
            <a href="mailto:info@bildungswerkeuler.de">✉️ E-Mail</a>
          </div>
        )}
      </div>
    </main>
  );
}
