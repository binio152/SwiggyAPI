import { Resend } from "resend";
import { env } from "../config/env";
import Utils from "./Utils";
import { EmailTypes } from "../constants/emailTypes";
import { StringValue } from "ms";

const resend = new Resend(env.RESEND_API_KEY);

class ResendMail {
  static generateVerificationEmailHTML(otp: string, ttl: string) {
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

  static generatePasswordRestEmailHTML(otp: string, ttl: string) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Reset Password</h2>
      <p>Hello,</p>
      <p>We received a request to reset the password for your account.\
         Use the OTP below to reset your password:</p>

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

  static async sendVerificationToken(mail: {
    token: string;
    ttl: StringValue;
    to: string;
    type: EmailType;
  }) {
    // Token Generation
    const tokenTtl = Utils.getStringTokenTTL(mail.ttl);

    // Email subject, html
    let html, subject;
    switch (mail.type) {
      case EmailTypes.VERIFICATION:
        html = this.generateVerificationEmailHTML(mail.token, tokenTtl);
        subject = "Email Verification";
        break;
      case EmailTypes.RESET_PASSWORD:
        html = this.generatePasswordRestEmailHTML(mail.token, tokenTtl);
        subject = "Reset Password";
        break;
    }

    const { data, error } = await this.sendEmail({
      to: mail.to,
      subject,
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
