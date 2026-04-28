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
          <Link href="/but-check">BuT</Link>
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
          <Link href="/but-check" onClick={() => setOpen(false)}>
            BuT
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
            Unsere Website wird über Vercel gehostet. Beim Aufruf der Website
            werden automatisch Informationen durch den Browser Ihres Endgeräts
            an die Server des Hosting-Anbieters übermittelt und temporär in
            sogenannten Server-Logfiles gespeichert. Die Domainverwaltung und
            E-Mail-Dienste können ergänzend über All-Inkl betrieben werden.
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

          <h2>7. BuT-Formular-Generator / Lernförderungsanfrage</h2>
          <p>
            Auf unserer Website stellen wir einen Formular-Generator zur
            Vorbereitung einer Anfrage auf Lernförderung im Rahmen von Bildung
            und Teilhabe bereit. Wenn Sie diesen Generator nutzen, können je
            nach Eingabe insbesondere folgende Daten verarbeitet werden:
          </p>
          <ul>
            <li>Name des Kindes</li>
            <li>Geburtsdatum des Kindes</li>
            <li>Jahrgangsstufe bzw. Klasse</li>
            <li>Aktenzeichen, sofern angegeben</li>
            <li>
              ausgewählte Leistungsart, z. B. Bürgergeld, Wohngeld,
              Kinderzuschlag oder Sozialhilfe
            </li>
            <li>Ref-Code des verwendeten Flyers oder QR-Codes</li>
          </ul>
          <p>
            Diese Daten werden ausschließlich verwendet, um Ihre Anfrage zur
            Lernförderung vorzubereiten, das passende Formular vorauszufüllen
            und den weiteren Ablauf mit Ihnen zu begleiten. Die Verarbeitung
            erfolgt zur Bearbeitung Ihrer Anfrage und zur Durchführung
            vorvertraglicher bzw. organisatorischer Maßnahmen.
          </p>
          <p>
            Zur internen Zuordnung und Bearbeitung von Anfragen nutzen wir
            Google Apps Script und Google Sheets. Dabei können die von Ihnen
            eingegebenen Daten sowie der jeweilige Ref-Code in einer internen
            Tabelle gespeichert werden. Die Daten werden nicht öffentlich
            zugänglich gemacht und nur für die Bearbeitung der Anfrage genutzt.
          </p>
          <p>
            Nach Beendigung der Anfrage zur Lernförderung werden die hierfür
            gespeicherten personenbezogenen Daten gelöscht, soweit keine
            gesetzlichen Aufbewahrungspflichten oder berechtigten Gründe für
            eine weitere Speicherung bestehen.
          </p>

          <h2>8. Ref-Codes und QR-Codes</h2>
          <p>
            Einige Flyer und QR-Codes enthalten technische Ref-Codes. Diese
            dienen dazu, nachvollziehen zu können, über welchen Flyer oder
            welchen Kooperationspartner eine Anfrage erfolgt ist. Der Ref-Code
            wird nicht öffentlich angezeigt und dient ausschließlich der
            internen Zuordnung, Auswertung und Bearbeitung der Anfrage.
          </p>

          <h2>9. Ihre Rechte</h2>
          <p>Sie haben das Recht:</p>
          <ul>
            <li>auf Auskunft über Ihre gespeicherten Daten</li>
            <li>auf Berichtigung unrichtiger Daten</li>
            <li>auf Löschung Ihrer Daten</li>
            <li>auf Einschränkung der Verarbeitung</li>
            <li>auf Datenübertragbarkeit</li>
          </ul>

          <h2>10. Widerspruchsrecht</h2>
          <p>
            Sie haben das Recht, der Verarbeitung Ihrer personenbezogenen Daten
            jederzeit zu widersprechen.
          </p>

          <h2>11. Aktualität</h2>
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
