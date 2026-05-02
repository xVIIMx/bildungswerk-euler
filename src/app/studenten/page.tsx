"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useEffect, useRef, useState } from "react";

export default function StudentenPage() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [finishLineName, setFinishLineName] = useState("");
  const [finishLineEmail, setFinishLineEmail] = useState("");
  const [finishLineNewsletter, setFinishLineNewsletter] = useState(false);
  const [finishLineWebsite, setFinishLineWebsite] = useState("");
  const [finishLineStartedAt, setFinishLineStartedAt] = useState(() =>
    String(Date.now())
  );
  const [finishLineUniversity, setFinishLineUniversity] = useState("");
  const [finishLineCourse, setFinishLineCourse] = useState("");
  const [finishLineSubject, setFinishLineSubject] = useState("");
  const [finishLineReason, setFinishLineReason] = useState("");
  const [finishLineStatus, setFinishLineStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
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

  async function handleFinishLineApplication(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setFinishLineStatus("sending");

    try {
      const response = await fetch("/api/finish-line-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: finishLineName,
          email: finishLineEmail,
          newsletter: finishLineNewsletter,
          website: finishLineWebsite,
          startedAt: finishLineStartedAt,
          university: finishLineUniversity,
          course: finishLineCourse,
          subject: finishLineSubject,
          reason: finishLineReason,
        }),
      });

      if (!response.ok) {
        throw new Error("Bewerbung konnte nicht gesendet werden.");
      }

      setFinishLineStatus("success");
      setFinishLineName("");
      setFinishLineEmail("");
      setFinishLineNewsletter(false);
      setFinishLineWebsite("");
      setFinishLineStartedAt(String(Date.now()));
      setFinishLineUniversity("");
      setFinishLineCourse("");
      setFinishLineSubject("");
      setFinishLineReason("");
    } catch {
      setFinishLineStatus("error");
    }
  }

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
          <Link href="/studenten" className="header__nav-active">
            Studenten
          </Link>
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
          <Link
            href="/studenten"
            className="header__nav-active"
            onClick={() => setOpen(false)}
          >
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

      <section className="university-contact" id="finish-line-bewerbung">
        <div className="university-contact__box">
          <h2>Für Finish Line bewerben</h2>
          <p>
            Beschreiben Sie kurz Ihre Situation. Wir lesen jede Bewerbung
            sorgfältig und melden uns, wenn eine Aufnahme in das Projekt möglich
            ist.
          </p>

          <form
            className="but-fields"
            style={{ maxWidth: "720px", margin: "0 auto", textAlign: "left" }}
            onSubmit={handleFinishLineApplication}
          >
            <label
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              Website
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={finishLineWebsite}
                onChange={(event) => setFinishLineWebsite(event.target.value)}
              />
            </label>
            <label className="but-field" style={{ maxWidth: "520px" }}>
              <span>Name</span>
              <input
                type="text"
                value={finishLineName}
                onChange={(event) => setFinishLineName(event.target.value)}
                required
              />
            </label>

            <label className="but-field" style={{ maxWidth: "520px" }}>
              <span>E-Mail-Adresse</span>
              <input
                type="email"
                value={finishLineEmail}
                onChange={(event) => setFinishLineEmail(event.target.value)}
                required
              />
            </label>

            <label className="but-field" style={{ maxWidth: "520px" }}>
              <span>Hochschule / Universität</span>
              <input
                type="text"
                value={finishLineUniversity}
                onChange={(event) =>
                  setFinishLineUniversity(event.target.value)
                }
                required
              />
            </label>

            <label className="but-field" style={{ maxWidth: "520px" }}>
              <span>Studiengang</span>
              <input
                type="text"
                value={finishLineCourse}
                onChange={(event) => setFinishLineCourse(event.target.value)}
                required
              />
            </label>

            <label className="but-field" style={{ maxWidth: "520px" }}>
              <span>Fach / Modul im Drittversuch</span>
              <input
                type="text"
                value={finishLineSubject}
                onChange={(event) => setFinishLineSubject(event.target.value)}
                required
              />
            </label>

            <label className="but-field">
              <span>
                Warum sollten Sie für das Finish Line Projekt ausgewählt werden?
              </span>
              <textarea
                value={finishLineReason}
                onChange={(event) => setFinishLineReason(event.target.value)}
                rows={8}
                required
              />
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                maxWidth: "720px",
                fontSize: "15px",
                lineHeight: "1.6",
                color: "#555",
              }}
            >
              <input
                type="checkbox"
                checked={finishLineNewsletter}
                onChange={(event) =>
                  setFinishLineNewsletter(event.target.checked)
                }
                style={{ marginTop: "4px" }}
              />
              <span>
                Ich möchte per E-Mail über kostenlose Studienmaterialien,
                Lernhilfen und zukünftige Finish-Line-Bewerbungsrunden
                informiert werden.
              </span>
            </label>

            <div
              className="but-generator__actions"
              style={{ justifyContent: "flex-start" }}
            >
              <button
                type="submit"
                className="btn btn-tertiary but-action-button"
                disabled={finishLineStatus === "sending"}
              >
                {finishLineStatus === "sending"
                  ? "Bewerbung wird gesendet..."
                  : "Bewerbung absenden"}
              </button>
            </div>

            {finishLineStatus === "success" && (
              <p className="but-eligibility__text">
                Vielen Dank. Ihre Bewerbung wurde erfolgreich gesendet.
              </p>
            )}

            {finishLineStatus === "error" && (
              <p className="but-eligibility__text">
                Die Bewerbung konnte gerade nicht gesendet werden. Bitte
                versuchen Sie es später erneut oder schreiben Sie direkt an
                info@bildungswerkeuler.de.
              </p>
            )}
          </form>
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
              href="https://api.whatsapp.com/send?phone=4915256075324"
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
            <a href="https://api.whatsapp.com/send?phone=4915256075324">
              💬 WhatsApp
            </a>
            <a href="mailto:info@bildungswerkeuler.de">✉️ E-Mail</a>
          </div>
        )}
      </div>
    </main>
  );
}
