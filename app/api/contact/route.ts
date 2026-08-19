import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      company?: string;
      message?: string;
    };

    const name = body.name?.trim();
    const email = body.email?.trim();
    const company = body.company?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER;
    // Strip all whitespace — Gmail shows app passwords with spaces but SMTP needs them removed
    const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");
    const toEmail = process.env.CONTACT_EMAIL || user;

    if (
      !user ||
      !pass ||
      pass === "YOUR_NEW_16_CHAR_APP_PASSWORD_HERE" ||
      user === "MY_GMAIL_EMAIL"
    ) {
      return NextResponse.json(
        {
          message:
            "SMTP is not configured. Please generate a new Gmail App Password at https://myaccount.google.com/apppasswords and update SMTP_PASS in .env.local",
        },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      // port 587 uses STARTTLS (secure:false), port 465 uses SSL (secure:true)
      secure: port === 465,
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verify connection before sending
    await transporter.verify();

    const mailOptions = {
      from: `"${name}" <${user}>`,
      replyTo: email,
      to: toEmail,
      subject: `New portfolio inquiry from ${name}`,
      text: `You received a new contact submission:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || "Not provided"}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #0f172a; margin-bottom: 16px;">📬 New Portfolio Inquiry</h2>
          <div style="margin-bottom: 12px;">
            <strong style="color: #475569;">Name:</strong> <span style="color: #1e293b;">${name}</span>
          </div>
          <div style="margin-bottom: 12px;">
            <strong style="color: #475569;">Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
          </div>
          <div style="margin-bottom: 12px;">
            <strong style="color: #475569;">Company:</strong> <span style="color: #1e293b;">${company || "Not provided"}</span>
          </div>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <div style="margin-bottom: 8px;">
            <strong style="color: #475569;">Message:</strong>
          </div>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #cbd5e1; white-space: pre-wrap; color: #0f172a;">${message}</div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "Thanks for reaching out. Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("[SMTP Error]", error);

    let userMessage = "Unable to send message. Please try again later.";

    if (error instanceof Error) {
      if (
        error.message.includes("Invalid login") ||
        error.message.includes("535") ||
        error.message.includes("BadCredentials")
      ) {
        userMessage =
          "Email authentication failed. The Gmail App Password may be expired or incorrect. Please generate a new one at https://myaccount.google.com/apppasswords";
        console.error(
          "[SMTP] Fix: Go to https://myaccount.google.com/apppasswords → generate new App Password named 'Portfolio' → update SMTP_PASS in .env.local (no spaces)",
        );
      } else if (error.message.includes("ECONNREFUSED") || error.message.includes("ETIMEDOUT")) {
        userMessage = "Could not connect to mail server. Check SMTP_HOST and SMTP_PORT settings.";
      } else {
        userMessage = error.message;
      }
    }

    return NextResponse.json({ message: userMessage }, { status: 500 });
  }
}
