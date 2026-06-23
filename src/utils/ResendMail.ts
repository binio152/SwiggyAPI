import express from "express";
import { Resend } from "resend";
import { env } from "../config/env";

const resend = new Resend(env.RESEND_API_KEY);

class ResendMail {
  static generateVerifyEmailHTML(otp: string) {
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

      <p>This OTP will expire in <strong>10 minutes</strong>.</p>
      <p>If you didn't request this verification, please ignore this email.</p>

      <hr />

      <p style="font-size: 12px; color: #666;">© 2026 Swiggy Clone App</p>
    </div>
  `;
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
