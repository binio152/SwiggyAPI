import { Resend } from "resend";
import { env } from "../config/env";
import Utils from "./Utils";

const resend = new Resend(env.RESEND_API_KEY);

class ResendMail {
  static generateVerifyEmailHTML(otp: string, ttl: string) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Email Verification</h2>
      <p>Hello,</p>
      <p>Thank you for registering. Use the OTP below to verify your email:</p>

      <div
        style="
          background: #f4f4f4;
          padding: 16px;
          text-align: center;
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 6px;
          border-radius: 8px;
          margin: 24px 0;
        "
      >
        ${otp}
      </div>

      <p>This OTP will expire in <strong>${ttl}</strong>.</p>
      <p>If you didn't request this verification, please ignore this email.</p>

      <hr />

      <p style="font-size: 12px; color: #666;">© 2026 Swiggy Clone App</p>
    </div>
  `;
  }

  static async sendVerificationToken(mail: { token: string; to: string }) {
    const tokenTtl = Utils.getStringTokenTTL();
    const html = this.generateVerifyEmailHTML(mail.token, tokenTtl);
    const { data, error } = await this.sendEmail({
      to: mail.to,
      subject: "Email Verification",
      html,
    });

    return { data, error };
  }

  static async sendEmail(mail: { to: string; subject: string; html: string }) {
    const { to, subject, html } = mail;
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    return { data, error };
  }
}

export default ResendMail;
