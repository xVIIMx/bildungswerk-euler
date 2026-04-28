"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { useSearchParams } from "next/navigation";

export default function ButCheckPage() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [district, setDistrict] = useState("wiesbaden");
  const [selectedBenefit, setSelectedBenefit] = useState("");
  const [childName, setChildName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [schoolClass, setSchoolClass] = useState("");
  const [aktenzeichen, setAktenzeichen] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [refCode, setRefCode] = useState("KEINCODE");
  const [languageCode, setLanguageCode] = useState("de");
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRefCode(params.get("ref") || "KEINCODE");
    setLanguageCode(params.get("lang") || "de");
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const districtLabel = useMemo(() => {
    if (district === "wiesbaden") return "Wiesbaden";
    if (district === "mainz") return "Mainz";
    if (district === "mtk") return "Main-Taunus-Kreis";
    return "Wiesbaden";
  }, [district]);

  const formEnabled = !!selectedBenefit;
  const isArabic = languageCode === "ar";
  const whatsappClaimMessage = isArabic
    ? "مرحباً، أريد فحص إمكانية الحصول على دروس دعم مجانية."
    : "Hallo, ich möchte meinen Anspruch auf kostenlose Nachhilfe prüfen lassen.";
  const whatsappClaimUrl = `https://api.whatsapp.com/send?phone=4915256075324&text=${encodeURIComponent(
    whatsappClaimMessage,
  )}`;

  function trackButEvent(params: {
    ref: string;
    name?: string;
    birth?: string;
    klasse?: string;
    aktenzeichen?: string;
  }) {
    const webhook =
      "https://script.google.com/macros/s/AKfycbz2G5C_nrWrsQDnUqVbgCLmSjiExomni2wtk9opz1ZbNAq_Wmt7gYC25jOyM7nsqBFy/exec";

    const query = new URLSearchParams({
      ref: params.ref,
      name: params.name || "",
      birth: params.birth || "",
      class: params.klasse || "",
      aktenzeichen: params.aktenzeichen || "",
    });

    const trackingUrl = `${webhook}?${query.toString()}`;

    try {
      fetch(trackingUrl, {
        method: "GET",
        mode: "no-cors",
        cache: "no-store",
        keepalive: true,
      });
    } catch {
      const img = new window.Image();
      img.src = trackingUrl;
    }
  }

  async function generatePdf() {
    if (!selectedBenefit) {
      alert(
        isArabic
          ? "يرجى أولاً اختيار نوع المساعدة التي تحصلون عليها."
          : "Bitte wählen Sie zuerst aus, über welche Leistung Bildung und Teilhabe beantragt wird.",
      );
      return;
    }

    if (!childName || !birthDate || !schoolClass) {
      alert(
        isArabic
          ? "يرجى تعبئة جميع الحقول المطلوبة."
          : "Bitte füllen Sie alle Pflichtfelder aus.",
      );
      return;
    }

    if (district !== "wiesbaden") {
      alert(
        isArabic
          ? `سيتم تفعيل نموذج ${districtLabel} قريباً. حالياً النموذج متاح فقط لمدينة Wiesbaden.`
          : `Für ${districtLabel} wird das Formular in Kürze freigeschaltet. Aktuell ist nur Wiesbaden verfügbar.`,
      );
      return;
    }

    const normalizedLang = languageCode.toUpperCase();

    trackButEvent({
      ref: `${refCode}-${normalizedLang}`,
      name: childName,
      birth: birthDate,
      klasse: schoolClass,
      aktenzeichen,
    });

    try {
      setIsGenerating(true);

      const pdfTemplate =
        languageCode === "ar"
          ? "/but-wiesbaden-bestaetigung-der-schule-ar.pdf"
          : "/but-wiesbaden-bestaetigung-der-schule.pdf";

      const existingPdfBytes = await fetch(`${pdfTemplate}?v=${Date.now()}`, {
        cache: "no-store",
      }).then((res) => res.arrayBuffer());

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      const firstPage = pdfDoc.getPages()[1];

      firstPage.drawText(childName, {
        x: 195,
        y: 660,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(birthDate, {
        x: 195,
        y: 630,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(schoolClass, {
        x: 195,
        y: 607,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });

      if (aktenzeichen) {
        firstPage.drawText(aktenzeichen, {
          x: 195,
          y: 580,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const pdfArrayBuffer = pdfBytes.buffer.slice(
        pdfBytes.byteOffset,
        pdfBytes.byteOffset + pdfBytes.byteLength,
      ) as ArrayBuffer;
      const blob = new Blob([pdfArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      window.open(url, "_blank", "noopener,noreferrer");

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 60000);
    } catch (error) {
      console.error(error);
      alert(
        isArabic
          ? "حدث خطأ أثناء إنشاء ملف PDF."
          : "Beim Erstellen der PDF ist ein Fehler aufgetreten.",
      );
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <main
      className="but-page"
      dir={isArabic ? "rtl" : "ltr"}
      lang={isArabic ? "ar" : "de"}
    >
      <header
        className={`header ${scrolled ? "header--scrolled" : ""}`}
        dir="ltr"
      >
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

      <section className="but-hero">
        <div className="but-hero__overlay">
          <div className="but-hero__content">
            <div className="but-hero__card">
              <p className="but-hero__eyebrow">
                {isArabic ? "Bildung und Teilhabe" : "Bildung und Teilhabe"}
              </p>
              <h1>
                {isArabic
                  ? "فحص إمكانية الحصول على دروس دعم مجانية"
                  : "Kostenlose Nachhilfe prüfen"}
              </h1>
              <p className="but-hero__text">
                {isArabic
                  ? "إذا كنتم تحصلون على Bürgergeld أو Wohngeld أو Kinderzuschlag أو Sozialhilfe، فقد يتم تغطية تكاليف الدعم الدراسي لطفلكم بالكامل في كثير من الحالات."
                  : "Wenn Sie Bürgergeld, Wohngeld, Kinderzuschlag oder Sozialhilfe beziehen, kann schulische Lernförderung in vielen Fällen vollständig übernommen werden."}
              </p>
              <div className="but-hero__actions">
                <a href="#but-generator" className="btn btn-tertiary">
                  {isArabic
                    ? "تحضير النموذج الآن"
                    : "Jetzt Formular vorbereiten"}
                </a>
                <a href={whatsappClaimUrl} className="btn btn-secondary-dark">
                  {isArabic ? "فتح واتساب" : "WhatsApp öffnen"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="but-info">
        <div className="but-section-header">
          <h2>{isArabic ? "كيف تسير الخطوات؟" : "So funktioniert es"}</h2>
          <p>
            {isArabic
              ? "نحن نجعل البداية سهلة قدر الإمكان. تقومون بإدخال البيانات الأساسية فقط، ونقوم نحن بتحضير النموذج الرسمي ومرافقتكم في باقي الخطوات."
              : "Wir vereinfachen den Einstieg so weit wie möglich. Sie füllen nur die Grunddaten aus, wir bereiten das offizielle Formular vor und den Rest des Ablaufs begleiten wir mit Ihnen gemeinsam."}
          </p>
          <div className="but-section-line"></div>
        </div>

        <div className="but-steps">
          <div className="but-step-card">
            <h3>{isArabic ? "١. إدخال البيانات" : "1. Daten eingeben"}</h3>
            <p>
              {isArabic
                ? "اختاروا المنطقة ونوع المساعدة المناسبة، ثم أدخلوا البيانات الأساسية لطفلكم."
                : "Wählen Sie Ihren Bezirk, die passende Leistungsart und tragen Sie die Grunddaten Ihres Kindes ein."}
            </p>
          </div>

          <div className="but-step-card">
            <h3>{isArabic ? "٢. إنشاء ملف PDF" : "2. PDF herunterladen"}</h3>
            <p>
              {isArabic
                ? "تحصلون على النموذج المناسب وقد تم تعبئة البيانات الأساسية فيه مسبقاً."
                : "Sie erhalten die passende Vorlage bereits vorausgefüllt und sparen sich unnötige Rückfragen und manuelle Vorarbeit."}
            </p>
          </div>

          <div className="but-step-card">
            <h3>
              {isArabic
                ? "٣. المدرسة تكمل النموذج"
                : "3. Schule ausfüllen lassen"}
            </h3>
            <p>
              {isArabic
                ? "تقوم المدرسة أو المعلمة أو المعلم بتعبئة الجزء المدرسي والتأكيد على الحاجة إلى الدعم التعليمي."
                : "Die Lehrkraft ergänzt nur noch den schulischen Teil und bestätigt, dass die Lernförderung zusätzlich erforderlich ist."}
            </p>
          </div>

          <div className="but-step-card">
            <h3>{isArabic ? "٤. إرسال النموذج إلينا" : "4. Uns zuschicken"}</h3>
            <p>
              {isArabic
                ? "أرسلوا لنا النموذج بعد تعبئته وختمه عبر واتساب، وسنرافقكم في الخطوات التالية."
                : "Senden Sie uns das unterschriebene Formular per WhatsApp. Den weiteren Ablauf übernehmen wir gemeinsam mit Ihnen."}
            </p>
          </div>
        </div>
      </section>

      <section className="but-generator" id="but-generator">
        <div className="but-generator__box">
          <p className="but-generator__eyebrow">Bildung und Teilhabe</p>
          <h2>
            {isArabic
              ? "لديكم خياران بسيطان"
              : "Sie haben zwei einfache Möglichkeiten"}
          </h2>
          <p className="but-generator__intro">
            {isArabic
              ? "يمكنكم التواصل معنا مباشرة عبر واتساب لنراجع الخطوات معكم. أو يمكنكم تحضير النموذج المدرسي بأنفسكم هنا ثم إرساله إلينا بعد تعبئته من المدرسة."
              : "Sie können uns direkt per WhatsApp kontaktieren, damit wir den Ablauf gemeinsam mit Ihnen prüfen. Oder Sie bereiten das Schulformular direkt selbst vor und senden es uns anschließend ausgefüllt zurück."}
          </p>

          <div className="but-choice-boxes">
            <a href="#formular" className="but-choice-card">
              <span>{isArabic ? "أسرع طريقة" : "Schnellste Methode"}</span>
              <strong>
                {isArabic ? "تعبئة النموذج الآن" : "Jetzt Formular vorbereiten"}
              </strong>
              <small>
                {isArabic
                  ? "أدخلوا البيانات الأساسية، افتحوا ملف PDF، ثم قدّموه مباشرة إلى المدرسة."
                  : "Daten eintragen, PDF öffnen und direkt bei der Schule abgeben."}
              </small>
            </a>

            <a
              href={whatsappClaimUrl}
              onClick={() => {
                const normalizedLang = languageCode.toUpperCase();
                trackButEvent({
                  ref: `${refCode}-${normalizedLang}`,
                });
              }}
              className="but-choice-card"
            >
              <span>
                {isArabic ? "مباشرة عبر واتساب" : "Direkt über WhatsApp"}
              </span>
              <strong>
                {isArabic
                  ? "أريد المساعدة في الخطوات"
                  : "Ich möchte Hilfe beim Ablauf"}
              </strong>
              <small>
                {isArabic
                  ? "اكتبوا لنا مباشرة. نراجع معكم الخطوات المناسبة ونساعدكم في فهم ما يجب فعله."
                  : "Schreiben Sie uns direkt. Wir prüfen gemeinsam, welche nächsten Schritte sinnvoll sind."}
              </small>
            </a>
          </div>

          <div id="formular" className="but-generator__form-anchor">
            <h3>{isArabic ? "تحضير النموذج" : "Formular vorbereiten"}</h3>
            <p>
              {isArabic
                ? "اختاروا أولاً المنطقة ونوع المساعدة المناسبة. بعد ذلك يمكنكم إدخال بيانات طفلكم."
                : "Wählen Sie zuerst Ihren Bezirk und die passende Leistungsart aus. Danach können Sie die Angaben Ihres Kindes eintragen."}
            </p>
          </div>

          <div className="but-generator__top">
            <label className="but-field">
              <span>{isArabic ? "المنطقة / المدينة" : "Bezirk / Stadt"}</span>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                style={inputStyle}
              >
                <option value="wiesbaden">Wiesbaden</option>
                <option value="mainz">Mainz</option>
                <option value="mtk">Main-Taunus-Kreis</option>
              </select>
            </label>

            <div className="but-eligibility">
              <span className="but-eligibility__title">
                {isArabic
                  ? "شرط الاستفادة من Bildung und Teilhabe"
                  : "Voraussetzung für Bildung und Teilhabe"}
              </span>
              <p className="but-eligibility__text">
                {isArabic
                  ? "يرجى اختيار نوع المساعدة التي تحصلون عليها حالياً. بدون إحدى هذه المساعدات، غالباً لا تكون Lernförderung ممكنة عبر BuT."
                  : "Bitte wählen Sie aus, welche Leistung Sie aktuell beziehen. Ohne eine dieser Leistungen ist eine BuT-Lernförderung in der Regel nicht möglich."}
              </p>

              <div className="but-benefit-grid">
                <button
                  type="button"
                  onClick={() => setSelectedBenefit("bürgergeld")}
                  style={benefitButtonStyle(selectedBenefit === "bürgergeld")}
                >
                  {isArabic
                    ? "Bürgergeld (Jobcenter)"
                    : "Bürgergeld (Jobcenter)"}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedBenefit("wohngeld")}
                  style={benefitButtonStyle(selectedBenefit === "wohngeld")}
                >
                  {isArabic ? "Wohngeld" : "Wohngeld"}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedBenefit("kinderzuschlag")}
                  style={benefitButtonStyle(
                    selectedBenefit === "kinderzuschlag",
                  )}
                >
                  {isArabic ? "Kinderzuschlag" : "Kinderzuschlag"}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedBenefit("sozialhilfe")}
                  style={benefitButtonStyle(selectedBenefit === "sozialhilfe")}
                >
                  {isArabic ? "Sozialhilfe" : "Sozialhilfe"}
                </button>
              </div>
            </div>
          </div>

          <div className="but-fields">
            <label className="but-field">
              <span>{isArabic ? "اسم الطفل" : "Name des Kindes"}</span>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                disabled={!formEnabled}
                placeholder={
                  isArabic ? "مثال: Max Mustermann" : "z. B. Max Mustermann"
                }
                style={inputStyle}
              />
            </label>

            <label className="but-field">
              <span>{isArabic ? "تاريخ الميلاد" : "Geburtsdatum"}</span>
              <input
                type="text"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                disabled={!formEnabled}
                placeholder={isArabic ? "مثال: 01.01.2015" : "z. B. 01.01.2015"}
                style={inputStyle}
              />
            </label>

            <label className="but-field">
              <span>
                {isArabic
                  ? "الصف / المرحلة الدراسية"
                  : "Jahrgangsstufe / Klasse"}
              </span>
              <input
                type="text"
                value={schoolClass}
                onChange={(e) => setSchoolClass(e.target.value)}
                disabled={!formEnabled}
                placeholder={isArabic ? "مثال: 7b" : "z. B. 7b"}
                style={inputStyle}
              />
            </label>

            <label className="but-field">
              <span>
                {isArabic ? "رقم الملف (اختياري)" : "Aktenzeichen (optional)"}
              </span>
              <input
                type="text"
                value={aktenzeichen}
                onChange={(e) => setAktenzeichen(e.target.value)}
                disabled={!formEnabled}
                placeholder={
                  isArabic ? "يمكن إرساله لاحقاً" : "Kann nachgereicht werden"
                }
                style={inputStyle}
              />
            </label>
          </div>

          <p className="but-privacy-note">
            {isArabic
              ? "تُستخدم بياناتكم فقط لمعالجة طلب الدعم التعليمي. بعد انتهاء الطلب، يتم حذف البيانات تلقائياً."
              : "Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage zur Lernförderung verwendet. Nach Beendigung der Anfrage werden die Daten automatisch gelöscht."}
          </p>
          <div className="but-generator__actions">
            <button
              onClick={generatePdf}
              disabled={isGenerating || !formEnabled}
              className="btn btn-tertiary but-action-button"
            >
              {isGenerating
                ? isArabic
                  ? "يتم إنشاء ملف PDF ..."
                  : "PDF wird erstellt ..."
                : isArabic
                  ? "إنشاء النموذج"
                  : "Formular erstellen"}
            </button>

            <a
              href={whatsappClaimUrl}
              onClick={() => {
                const normalizedLang = languageCode.toUpperCase();
                trackButEvent({
                  ref: `${refCode}-${normalizedLang}`,
                });
              }}
              className="btn btn-whatsapp but-action-button"
            >
              {isArabic ? "فتح واتساب" : "WhatsApp öffnen"}
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Bildungswerk Euler</p>
        <p>
          {isArabic
            ? "دروس دعم · برامج تعليمية · دورات"
            : "Nachhilfe · Ausbildungsprogramme · Kurse"}
        </p>
        <p className="footer__legal">
          © 2026 Bildungswerk Euler · <Link href="/impressum">Impressum</Link> ·{" "}
          <Link href="/datenschutz">Datenschutz</Link>
        </p>
      </footer>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  height: "52px",
  padding: "0 14px",
  border: "1px solid #d8cfc2",
  background: "#fff",
  fontSize: "16px",
  outline: "none",
  width: "100%",
};

function benefitButtonStyle(isActive: boolean): React.CSSProperties {
  return {
    minHeight: "62px",
    padding: "14px 16px",
    border: `1px solid ${isActive ? "#111" : "#d8cfc2"}`,
    background: isActive ? "#111" : "#f8f5ef",
    color: isActive ? "#fff" : "#111",
    fontSize: "15px",
    fontWeight: 600,
    textAlign: "left",
    cursor: "pointer",
  };
}
