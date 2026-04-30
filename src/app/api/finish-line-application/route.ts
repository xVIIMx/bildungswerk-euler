import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type FinishLineApplication = {
  name?: string;
  university?: string;
  course?: string;
  subject?: string;
  reason?: string;
};

function isFilled(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function getErrorCode(error: unknown) {
  if (error instanceof Error && "code" in error) {
    const code = (error as { code?: unknown }).code;

    if (typeof code === "string") {
      return code;
    }
  }

  if (error instanceof Error) {
    return error.name || "UNKNOWN_ERROR";
  }

  return "UNKNOWN_ERROR";
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as FinishLineApplication;

    const name = data.name?.trim();
    const university = data.university?.trim();
    const course = data.course?.trim();
    const subject = data.subject?.trim();
    const reason = data.reason?.trim();

    if (
      !isFilled(name) ||
      !isFilled(university) ||
      !isFilled(course) ||
      !isFilled(subject) ||
      !isFilled(reason)
    ) {
      return NextResponse.json(
        { message: "Bitte alle Pflichtfelder ausfüllen." },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const mailTo = process.env.MAIL_TO || "info@bildungswerkeuler.de";
    const mailFrom = process.env.MAIL_FROM || smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass || !mailFrom) {
      return NextResponse.json(
        { message: "Mailserver ist nicht vollständig konfiguriert." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const text = [
      "Neue Bewerbung für das Finish Line Projekt",
      "",
      `Name: ${name}`,
      `Hochschule / Universität: ${university}`,
      `Studiengang: ${course}`,
      `Fach / Modul im Drittversuch: ${subject}`,
      "",
      "Begründung:",
      reason,
    ].join("\n");

    await transporter.sendMail({
      from: `Bildungswerk Euler <${mailFrom}>`,
      to: mailTo,
      subject: `Finish Line Bewerbung: ${name}`,
      text,
      replyTo: mailFrom,
    });

    return NextResponse.json({ message: "Bewerbung wurde gesendet." });
  } catch (error) {
    const errorCode = getErrorCode(error);

    console.error("Finish Line application error:", error);

    return NextResponse.json(
      {
        message: "Bewerbung konnte nicht gesendet werden.",
        errorCode,
      },
      { status: 500 }
    );
  }
}
