"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function StudentenPage() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
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
          <Link href="/studenten">Studenten</Link>
          <Link href="/but-check">BuT</Link>
        </nav>

        <div className="header__menu" onClick={() => setOpen((prev) => !prev)}>
          ☰
        </div>
      </header>
      {open && (
        <div className="mobile-menu" ref={mobileMenuRef}>
          <Link href="/">Bildungswerk Euler</Link>
          <Link href="/schueler" onClick={() => setOpen(false)}>
            Schüler
          </Link>
          <Link href="/studenten" onClick={() => setOpen(false)}>
            Studenten
          </Link>
          <Link href="/but-check" onClick={() => setOpen(false)}>
            BuT
          </Link>
        </div>
      )}
      <section className="university-hero">
        <div className="university-hero__overlay">
          <div className="university-hero__content">
            <div className="university-hero__card">
              <p className="university-hero__eyebrow">Für Studenten</p>

              <h1>Akademische Unterstützung mit Struktur.</h1>

              <p className="university-hero__text">
                Fachlich fundierte Begleitung für Studierende, die Inhalte
                wirklich verstehen, Prüfungen sicher bestehen und ihr Studium
                mit Klarheit und System voranbringen wollen.
              </p>

              <div className="university-hero__actions">
                <a href="#kontakt" className="btn btn-tertiary">
                  Beratungsgespräch vereinbaren
                </a>
                <a href="#finish-line" className="btn btn-tertiary">
                  Finish Line entdecken
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="university-benefits">
        <div className="university-section-header">
          <h2>Was Studierende bei uns bekommen</h2>
          <p>
            Keine oberflächliche Nachhilfe, sondern strukturierte akademische
            Unterstützung für Verständnis, Prüfungssicherheit und nachhaltigen
            Studienerfolg.
          </p>
          <div className="university-section-line"></div>
        </div>

        <div className="university-benefits__grid">
          <div className="university-benefit-card">
            <h3>Fachliche Klarheit</h3>
            <p>
              Schwierige Inhalte werden systematisch aufbereitet, damit sie
              nicht nur kurzfristig gelernt, sondern wirklich verstanden werden.
            </p>
          </div>

          <div className="university-benefit-card">
            <h3>Prüfungsorientierte Begleitung</h3>
            <p>
              Wir arbeiten gezielt auf Klausuren, Module und Leistungsnachweise
              hin, mit Fokus auf Struktur, Strategie und belastbare
              Vorbereitung.
            </p>
          </div>

          <div className="university-benefit-card">
            <h3>Individuelle Unterstützung</h3>
            <p>
              Jede Begleitung richtet sich nach Fach, Semesterstand,
              Verständnislücken und den konkreten Anforderungen des Studiums.
            </p>
          </div>
        </div>
      </section>
      <section className="university-focus">
        <div className="university-focus__container">
          <div className="university-focus__left">
            <h2>Für anspruchsvolle Studienphasen</h2>
            <p>
              Besonders in fordernden Modulen, in Prüfungsphasen oder bei
              wiederkehrenden Verständnisproblemen braucht es keine hektische
              Improvisation, sondern ein klares System.
            </p>

            <ul className="university-list">
              <li>Begleitung in schwierigen Modulen</li>
              <li>Vorbereitung auf Klausuren und Leistungsnachweise</li>
              <li>Strukturierung komplexer Inhalte</li>
              <li>Aufarbeitung fachlicher Lücken</li>
              <li>Unterstützung bei langfristiger Studienstrategie</li>
            </ul>
          </div>

          <div className="university-focus__right">
            <div className="university-note-card">
              <h3>Für wen das gedacht ist</h3>
              <p>
                Für Studierende, die nicht nur bestehen, sondern akademisch
                sauber arbeiten wollen, mit mehr Klarheit, mehr Sicherheit und
                einer verlässlichen Struktur im Lernprozess.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="finish-line" id="finish-line">
        <div className="university-section-header">
          <h2>Finish Line</h2>
          <p>
            Unser spezielles Pro-Bono-Unterstützungsangebot für ausgewählte
            Studierende im Drittversuch und in kritischen Abschlussphasen.
          </p>
          <div className="university-section-line"></div>
        </div>

        <div className="finish-line__box">
          <div className="finish-line__left">
            <h3>Wenn Scheitern weitreichende Folgen hätte</h3>
            <p>
              Finish Line ist kein reguläres Programm, sondern ein begrenztes
              Pro-Bono- Angebot für Studierende in besonders kritischen
              Prüfungssituationen.
            </p>
            <p>
              Pro Semester werden nur ein bis zwei Fälle aufgenommen. Die
              Auswahl erfolgt nicht zufällig, sondern auf Bewerbung und nach
              individueller Dringlichkeit.
            </p>
            <p>
              Dabei berücksichtigen wir insbesondere, wie weit das Studium
              bereits fortgeschritten ist und welche Folgen ein Scheitern im
              Drittversuch konkret hätte.
            </p>
          </div>

          <div className="finish-line__right">
            <div className="finish-line__item">
              Strukturierte Aufarbeitung des relevanten Prüfungsstoffs
            </div>
            <div className="finish-line__item">
              Fokussierung auf Verständnis, Sicherheit und Prüfungspraxis
            </div>
            <div className="finish-line__item">
              Begleitung für Studierende in kritischen Verlaufsphasen
            </div>
            <div className="finish-line__item">
              Ruhige, zielorientierte Vorbereitung auf den letzten Anlauf
            </div>
          </div>
        </div>
      </section>
      <section className="university-contact" id="kontakt">
        <div className="university-contact__box">
          <h2>Beratung für Studierende anfragen</h2>
          <p>
            Wir besprechen gemeinsam Ihre Studiensituation, die aktuelle
            Herausforderung und die passende Form der Unterstützung, fachlich,
            strukturiert und unverbindlich.
          </p>

          <div className="university-contact__actions">
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
