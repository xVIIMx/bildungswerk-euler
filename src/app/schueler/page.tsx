"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function SchuelerPage() {
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
        <div className="header__logo">
          <Image
            src="/logo.png"
            alt="Bildungswerk Euler Logo"
            width={190}
            height={64}
            unoptimized
          />
        </div>

        <nav className="header__nav">
          <Link href="/">Bildungswerk Euler</Link>
          <Link href="/schueler">Schüler</Link>
          <Link href="/studenten">Studenten</Link>
        </nav>

        <div className="header__menu" onClick={() => setOpen(!open)}>
          ☰
        </div>
      </header>
      {open && (
        <div className="mobile-menu" ref={mobileMenuRef}>
            <Link href="/">Bildungswerk Euler</Link>
          <Link href="/schueler" onClick={() => setOpen(false)}>Schüler</Link>
          <Link href="/studenten" onClick={() => setOpen(false)}>Studenten</Link>
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

            <a href="#kontakt" className="btn btn-primary">
              Kostenlosen Anspruch prüfen
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
            <a href="https://wa.me/4915256075324">💬 WhatsApp</a>
            <a href="mailto:info@bildungswerkeuler.de">✉️ E-Mail</a>
          </div>
        )}
      </div>
    </main>
  );
}
