"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DatenschutzPage() {
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
          <Link href="/studenten">Studenten</Link>
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
          <Link href="/studenten" onClick={() => setOpen(false)}>
            Studenten
          </Link>
        </div>
      )}

      <section className="legal">
        <div className="legal__container">
          <h1>Datenschutzerklärung</h1>

          <p>
            Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Die
            folgenden Hinweise geben einen einfachen Überblick darüber, was mit
            Ihren personenbezogenen Daten passiert, wenn Sie unsere Website
            besuchen.
          </p>

          <h2>1. Verantwortlicher</h2>
          <p>
            Bildungswerk Euler
            <br />
            Inh. Maikel Samaan
            <br />
            Albert-Schweitzer-Allee 76
            <br />
            65203 Wiesbaden
            <br />
            E-Mail: info@bildungswerkeuler.de
          </p>

          <h2>2. Hosting</h2>
          <p>
            Unsere Website wird bei einem externen Dienstleister (All-Inkl)
            gehostet. Beim Aufruf der Website werden automatisch Informationen
            durch den Browser Ihres Endgeräts an den Server unseres Hosters
            übermittelt und temporär in sogenannten Server-Logfiles gespeichert.
          </p>

          <h2>3. Erhebung und Speicherung personenbezogener Daten</h2>
          <p>
            Beim Besuch dieser Website werden automatisch folgende Daten
            erfasst:
          </p>
          <ul>
            <li>IP-Adresse</li>
            <li>Datum und Uhrzeit der Anfrage</li>
            <li>Browsertyp und Browserversion</li>
            <li>Betriebssystem</li>
            <li>Referrer-URL</li>
          </ul>

          <h2>4. Kontaktaufnahme</h2>
          <p>
            Wenn Sie uns per E-Mail, Telefon oder WhatsApp kontaktieren, werden
            Ihre Angaben zur Bearbeitung der Anfrage sowie für den Fall von
            Anschlussfragen bei uns gespeichert.
          </p>

          <h2>5. WhatsApp</h2>
          <p>
            Wir bieten die Möglichkeit, über einen Link mit uns per WhatsApp
            Kontakt aufzunehmen. Dabei werden Daten an WhatsApp (Meta Platforms
            Ireland Limited) übermittelt. Weitere Informationen finden Sie in
            der Datenschutzerklärung von WhatsApp.
          </p>

          <h2>6. Kontaktformular</h2>
          <p>
            Wenn Sie uns über ein Kontaktformular Anfragen zukommen lassen,
            werden Ihre Angaben aus dem Formular inklusive der von Ihnen
            angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage bei uns
            gespeichert.
          </p>

          <h2>7. Ihre Rechte</h2>
          <p>Sie haben das Recht:</p>
          <ul>
            <li>auf Auskunft über Ihre gespeicherten Daten</li>
            <li>auf Berichtigung unrichtiger Daten</li>
            <li>auf Löschung Ihrer Daten</li>
            <li>auf Einschränkung der Verarbeitung</li>
            <li>auf Datenübertragbarkeit</li>
          </ul>

          <h2>8. Widerspruchsrecht</h2>
          <p>
            Sie haben das Recht, der Verarbeitung Ihrer personenbezogenen Daten
            jederzeit zu widersprechen.
          </p>

          <h2>9. Aktualität</h2>
          <p>Diese Datenschutzerklärung ist aktuell gültig.</p>
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
