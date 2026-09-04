import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
});

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  try {
    // If SMTP is not configured, log and skip (no-op in dev)
    if (!process.env.SMTP_USER) {
      console.log("[Email] SMTP not configured. Skipping email to:", options.to);
      console.log("[Email] Subject:", options.subject);
      return true; // return true so the app flow continues
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"ASCEND" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });

    console.log("[Email] Sent successfully to:", options.to);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send:", error);
    return false;
  }
}

export async function verifyEmailConnection(): Promise<boolean> {
  try {
    if (!process.env.SMTP_USER) {
      return false;
    }
    await transporter.verify();
    return true;
  } catch {
    return false;
  }
}
