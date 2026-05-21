import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const to = process.env.WAITLIST_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "NeuroFlow <onboarding@resend.dev>";

  if (!resendApiKey || !to) {
    return NextResponse.json(
      { error: "Email notifications are not configured." },
      { status: 503 }
    );
  }

  let email = "";

  try {
    const body = (await request.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const safeEmail = escapeHtml(email);
  const submittedAt = new Date().toISOString();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject: "New NeuroFlow waitlist signup",
      text: `New NeuroFlow waitlist signup:\n\nEmail: ${email}\nSubmitted at: ${submittedAt}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
          <h1 style="margin: 0 0 16px; font-size: 24px;">New NeuroFlow waitlist signup</h1>
          <p style="margin: 0 0 8px;"><strong>Email:</strong> ${safeEmail}</p>
          <p style="margin: 0; color: #6b7280;"><strong>Submitted at:</strong> ${submittedAt}</p>
        </div>
      `
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      { error: "Email provider rejected the request.", details: errorText },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
