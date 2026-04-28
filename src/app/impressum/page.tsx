"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ImpressumPage() {
  const [open, setOpen] = useState(false);

  return (
    <main>
      <header className="header header--scrolled">
        <Link href="/" className="header__logo">
          <Image
            src="/logo.png"
            alt="Bildungswerk Euler Logo"
            width={190}
            height={64}
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

        <div className="header__menu" onClick={() => setOpen(!open)}>
          ☰
        </div>
      </header>

      {open && (
        <div className="mobile-menu">
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

      <section className="legal">
        <div className="legal__container">
          <h1>Impressum</h1>

          <p>Angaben gemäß § 5 DDG</p>

          <p>
            Bildungswerk Euler
            <br />
            Inh. Maikel Samaan
            <br />
            Albert-Schweitzer-Allee 76
            <br />
            65203 Wiesbaden
          </p>

          <p>
            Kontakt:
            <br />
            Telefon: +49 152 56075324
            <br />
            E-Mail: info@bildungswerkeuler.de
          </p>

          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:
            <br />
            DEXXXXX
          </p>

          <p>
            Tätigkeitsbereich:
            <br />
            Dienstleistungen im Bereich Nachhilfe und Bildungsförderung
          </p>

          <p>
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
            <br />
            Maikel Samaan
          </p>
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
