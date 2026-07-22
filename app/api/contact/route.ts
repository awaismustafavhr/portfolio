import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactFormEmail } from "@/emails/contact-form-email";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

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

    if (!resend) {
      return NextResponse.json(
        {
          message:
            "Contact form is configured, but RESEND_API_KEY is missing. Add it to your environment to enable email delivery.",
        },
        { status: 500 },
      );
    }

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL || "awaismustafavhr@gmail.com",
      replyTo: email,
      subject: `New portfolio inquiry from ${name}`,
      react: ContactFormEmail({
        name,
        email,
        company,
        message,
      }),
    });

    return NextResponse.json({
      message: "Thanks for reaching out. Your message has been sent.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to send message at the moment.",
      },
      { status: 500 },
    );
  }
}
