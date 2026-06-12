import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * POST /api/demo
 * Handles demo request submissions and sends email notifications.
 *
 * Required body fields:
 * - name: string
 * - email: string
 * - phone: string
 *
 * Optional body fields:
 * - company: string
 * - message: string
 *
 * Environment variables required:
 * - RESEND_API_KEY: Resend API key
 * - DEMO_TO_EMAIL: Email address to send notifications to
 * - DEMO_FROM_EMAIL: Email address to send from (must be verified in Resend)
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Parse and validate request body
  const { name, email, phone, company = "", message = "" } = req.body;

  // Validate required fields
  if (!name || !email || !phone) {
    return res.status(400).json({
      error: "Missing required fields: name, email, phone",
    });
  }

  // Validate email format (basic check)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Validate environment variables
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return res.status(500).json({ error: "Email service not configured" });
  }

  if (!process.env.DEMO_TO_EMAIL) {
    console.error("DEMO_TO_EMAIL not configured");
    return res.status(500).json({ error: "Email service not configured" });
  }

  if (!process.env.DEMO_FROM_EMAIL) {
    console.error("DEMO_FROM_EMAIL not configured");
    return res.status(500).json({ error: "Email service not configured" });
  }

  try {
    // Format submission time
    const submissionTime = new Date().toLocaleString("en-AE", {
      timeZone: "Asia/Dubai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Prepare email content
    const emailSubject = "New TaxCheck Demo Request";
    const emailBody = `
Dear TaxCheck Team,

A new demo request has been submitted from the website.

**Submission Details:**

Name: ${name}
Email: ${email}
Phone: ${phone}
${company ? `Company: ${company}` : "Company: Not provided"}
${message ? `Message:\n${message}` : "Message: Not provided"}

Submitted from: taxcheck.ae
Submission time: ${submissionTime} (UAE)

---

This is an automated message from your TaxCheck marketing website.
    `.trim();

    // Send email via Resend (official SDK pattern)
    const { data, error } = await resend.emails.send({
      from: process.env.DEMO_FROM_EMAIL,
      to: process.env.DEMO_TO_EMAIL,
      replyTo: email,
      subject: emailSubject,
      text: emailBody,
    });

    // Handle Resend API errors
    if (error) {
      console.error("Resend email send failed:", error);
      return res.status(500).json({
        error: "Failed to send email. Please try again later.",
      });
    }

    // Validate response contains email ID
    if (!data?.id) {
      console.error("Unexpected Resend response - missing email ID:", data);
      return res.status(500).json({
        error: "Failed to send email. Please try again later.",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Demo request sent successfully",
      id: data.id,
    });
  } catch (error) {
    console.error("Error sending demo email:", error);
    return res.status(500).json({
      error: "An error occurred while processing your request. Please try again later.",
    });
  }
}
