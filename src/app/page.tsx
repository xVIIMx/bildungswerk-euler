"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        contactRef.current &&
        !contactRef.current.contains(event.target as Node)
      ) {
        setContactOpen(false);
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
            width={180}
            height={60}
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
        <div className="mobile-menu">
          <a href="/schueler">Schüler</a>
          <a href="/studenten">Studenten</a>
          <a href="/schulen">Für Schulen</a>
          <a href="/praxis">Praxisqualifizierung</a>
        </div>
      )}
      <section className="hero">
        <div className="hero__overlay">
          <div className="hero__content">
            <div className="hero__card">
              <p className="hero__eyebrow">Bildungswerk Euler</p>
              <h1>Bildung mit Substanz.</h1>
              <p className="hero__text">
                Strukturierte Förderung, akademische Klarheit und moderne
                Lernkonzepte für Schüler, Studierende und Bildungspartner.
              </p>

              <div className="hero__actions">
                <a href="#kontakt" className="btn btn-primary">
                  Beratungsgespräch vereinbaren
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="services">
        <div className="services__header">
          <h2>Unsere Leistungen</h2>
          <p>
            Individuelle Förderung, praxisnahe Ausbildung und akademische
            Begleitung für nachhaltigen Bildungserfolg.
          </p>
          <div className="services__line"></div>
        </div>

        <div className="services__grid">
          <div className="service-card">
            <div className="service-card__body">
              <h3>Nachhilfe</h3>
              <p>
                Individuelle Förderung für alle Klassenstufen, verständlich und
                zielorientiert.
              </p>
            </div>

            <div className="service-buttons">
              <a href="/schueler" className="btn btn-secondary">
                Schüler
              </a>
              <a href="/studenten" className="btn btn-secondary">
                Studenten
              </a>
            </div>
          </div>

          <div className="service-card">
            <div className="service-card__body">
              <h3>Qualifizierungsprogramme</h3>
              <p>
                Praxisprogramme für Bewerber ohne Berufserfahrung. Reale
                Projekte, trainierte Arbeitsprozesse und ein dokumentierter
                Praxisnachweis.
              </p>
            </div>

            <div className="service-buttons">
              <a href="/praxis" className="btn btn-secondary">
                Mehr erfahren
              </a>
            </div>
          </div>

          <div className="service-card">
            <div className="service-card__body">
              <h3>Kurse</h3>
              <p>
                Strukturierte Kursformate für Schulen, Unternehmen und
                Privatpersonen zur gezielten Weiterbildung.
              </p>
            </div>

            <div className="service-buttons">
              <a href="/kurse" className="btn btn-secondary">
                Mehr erfahren
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="about">
        <div className="about__container">
          <div className="about__image">
            <Image
              src="/euler.png"
              alt="Leonhard Euler"
              width={420}
              height={520}
            />
          </div>

          <div className="about__content">
            <h2>Warum Bildungswerk Euler</h2>

            <p>
              Leonhard Euler steht für Klarheit im Denken.
              <br />
              Dieser Haltung folgen wir.
            </p>

            <p>
              Wir strukturieren Probleme,
              <br />
              machen Komplexes verständlich
              <br />
              und bauen Wissen von innen auf.
            </p>
          </div>
        </div>
      </section>
      <section className="audience">
        <div className="audience__header">
          <h2>Für wen wir da sind</h2>
          <div className="audience__line"></div>
        </div>

        <div className="audience__grid">
          <div className="audience__item">
            <h3>
              Lernende &amp; <br />
              Studierende
            </h3>
            <p>
              Begleitung durch Nachhilfe, Kurse und strukturierte Lernangebote
              für nachhaltigen schulischen und akademischen Erfolg.
            </p>
          </div>

          <div className="audience__item">
            <h3>Schulen &amp; Bildungseinrichtungen</h3>
            <p>
              Kooperationen, Förderprogramme und ergänzende Bildungsangebote zur
              gezielten Unterstützung von Lernenden.
            </p>
          </div>

          <div className="audience__item">
            <h3>Arbeitgeber &amp; Unternehmen</h3>
            <p>
              Praxisnahe Ausbildungsprogramme zur Qualifizierung, Vorbereitung
              und langfristigen Entwicklung von Fachkräften.
            </p>
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
