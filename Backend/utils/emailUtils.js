import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


export function generateOTP(length = 6) {
  return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)).toString();
}

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Accept self-signed certs for dev
  },
});

export async function sendOTPEmail({ to, otp }) {
  const mailOptions = {
    from: `"ServiceHub" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your ServiceHub OTP Code',
    html: `<div style="font-family:sans-serif">
      <h2>ServiceHub Email Verification</h2>
      <p>Your OTP code is:</p>
      <div style="font-size:2rem; font-weight:bold; letter-spacing:0.2em;">${otp}</div>
      <p>This code is valid for 1 minute only.</p>
    </div>`,
  };
  await transporter.sendMail(mailOptions);
}