import { NextResponse } from "next/server";
import { Resend } from "resend";

export interface ContactRequestBody {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  message: string;
  _honeypot?: string;
}

// Helper to escape HTML special characters for safe email rendering
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const body: ContactRequestBody = await req.json();
    const { name, email, company, projectType, message, _honeypot } = body;

    // 1. Honeypot check (spam protection)
    // If the hidden honeypot field is filled, silently ignore and pretend success
    if (_honeypot && _honeypot.trim().length > 0) {
      console.warn("[Contact API] Honeypot field triggered. Discarding spam submission silently.");
      return NextResponse.json({ success: true });
    }

    // 2. Server-side Data Validation
    const cleanName = (name || "").trim();
    const cleanEmail = (email || "").trim();
    const cleanCompany = (company || "").trim();
    const cleanProjectType = (projectType || "").trim();
    const cleanMessage = (message || "").trim();

    // Check required fields
    if (!cleanName || !cleanEmail || !cleanProjectType || !cleanMessage) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (cleanName.length > 100) {
      return NextResponse.json({ success: false, message: "Name must be 100 characters or less." }, { status: 400 });
    }
    if (cleanEmail.length > 255) {
      return NextResponse.json({ success: false, message: "Email must be 255 characters or less." }, { status: 400 });
    }
    if (cleanCompany.length > 150) {
      return NextResponse.json({ success: false, message: "Company name must be 150 characters or less." }, { status: 400 });
    }
    if (cleanProjectType.length > 100) {
      return NextResponse.json({ success: false, message: "Project type must be 100 characters or less." }, { status: 400 });
    }
    if (cleanMessage.length > 5000) {
      return NextResponse.json({ success: false, message: "Message must be 5000 characters or less." }, { status: 400 });
    }

    // 3. Verify Resend API Key
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === "your_resend_api_key_here") {
      console.error("[Contact API Error] RESEND_API_KEY environment variable is not configured.");
      return NextResponse.json(
        { success: false, message: "Email delivery service is currently not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // =========================================================================
    // SENDER & RECIPIENT CONFIGURATION
    // =========================================================================
    // Default Resend testing sender. Change SENDER_EMAIL below to your custom domain
    // address (e.g., "Smit Khatri <hello@mydomain.com>") once domain is verified in Resend.
    const SENDER_EMAIL = "Portfolio Inquiry <onboarding@resend.dev>";
    const RECIPIENT_EMAIL = "smit.sk.connect@gmail.com";

    const submissionDate = new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "medium",
    });

    // 4. Format Email Contents
    const textContent = `NEW PORTFOLIO INQUIRY

Name:
${cleanName}

Email:
${cleanEmail}

Company:
${cleanCompany || "Not provided"}

Project Type:
${cleanProjectType}

Message:
${cleanMessage}

Submitted:
${submissionDate}`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Portfolio Inquiry</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #111;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 12px; border: 1px solid #ea580c20; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <h2 style="color: #F14E08; margin-top: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #F14E08; padding-bottom: 12px;">
      NEW PORTFOLIO INQUIRY
    </h2>
    
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <tr>
        <td style="padding: 8px 0; font-weight: bold; width: 130px; color: #555;">Name:</td>
        <td style="padding: 8px 0; color: #111;">${escapeHtml(cleanName)}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
        <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(cleanEmail)}" style="color: #F14E08; text-decoration: none;">${escapeHtml(cleanEmail)}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td>
        <td style="padding: 8px 0; color: #111;">${escapeHtml(cleanCompany) || "<em>Not provided</em>"}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #555;">Project Type:</td>
        <td style="padding: 8px 0; color: #111;">${escapeHtml(cleanProjectType)}</td>
      </tr>
    </table>

    <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #eeeeee;">
      <p style="font-weight: bold; color: #555; margin-bottom: 8px;">Message:</p>
      <div style="background: #f4f1ea; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #222;">${escapeHtml(cleanMessage)}</div>
    </div>

    <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eeeeee; text-align: center; font-size: 12px; color: #888;">
      Submitted: <strong>${submissionDate}</strong>
    </div>
  </div>
</body>
</html>
`;

    // 5. Send via Resend SDK
    const { data, error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [RECIPIENT_EMAIL],
      replyTo: cleanEmail,
      subject: `New Portfolio Inquiry — ${cleanName}`,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error("[Contact API Error] Resend SDK returned an error:", error);
      return NextResponse.json(
        { success: false, message: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: unknown) {
    console.error("[Contact API Error] Unexpected exception in POST /api/contact:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again or email me directly." },
      { status: 500 }
    );
  }
}
