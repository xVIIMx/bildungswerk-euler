"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
                <a href="#kontakt" className="btn btn-tertiary">
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
              <Link href="/schueler" className="btn btn-primary">
                Schüler
              </Link>
              <Link href="/studenten" className="btn btn-primary">
                Studenten
              </Link>
            </div>
          </div>

          <div className="service-card">
            <div className="service-card__body">
              <h3>Weiterbildung</h3>
              <p>
                Vorbereitung auf AEVO, Ausbilderschein, Fachwirt, Betriebswirt
                und Meisterprüfung, strukturiert und prüfungsnah.
              </p>
            </div>

            <div className="service-buttons">
              <Link href="/weiterbildung" className="btn btn-primary">
                Weiterbildung
              </Link>
            </div>
          </div>

          <div className="service-card">
            <div className="service-card__body">
              <h3>Kurse</h3>
              <p>
                Praxisnahe Kurse für Unternehmen, öffentliche Projekte und
                Privatpersonen, von Office bis Coding.
              </p>
            </div>

            <div className="service-buttons">
              <Link href="/kurse" className="btn btn-primary">
                Kurse
              </Link>
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

          <div className="audience__item">
            <h3>Selbstlernende &amp; Weiterbildende</h3>
            <p>
              Strukturierte Lernprogramme für Menschen, die sich gezielt neue
              Fähigkeiten aneignen möchten, von Programmierung über Ethical
              Hacking bis hin zum Einstieg in die Selbstständigkeit.
            </p>
          </div>
        </div>
      </section>

      <section className="student-contact" id="kontakt">
        <div className="student-contact__box">
          <h2>Beratungsgespräch vereinbaren</h2>
          <p>
            Wir besprechen gemeinsam die Situation, den Förderbedarf und die
            passende Unterstützung.
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
