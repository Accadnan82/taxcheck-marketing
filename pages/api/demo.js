import { Resend } from "resend";

/**
 * POST /api/demo
 * Handles demo request submissions and sends email notifications.
 * Persists leads to HubSpot as contacts if token is configured.
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
 * Environment variables supported (with fallback):
 * - RESEND_API_KEY or TAXCHECK: Resend API key
 * - DEMO_TO_EMAIL or DEMO: Email address to send notifications to
 * - DEMO_FROM_EMAIL or FROM: Email address to send from (must be verified in Resend)
 * - HUBSPOT_ACCESS_TOKEN or HUBSPOT: HubSpot Private App Access Token
 */

async function searchHubSpotContactByEmail(email, hubspotToken) {
  try {
    const searchResponse = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts/search",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: "email",
                  operator: "EQ",
                  value: email,
                },
              ],
            },
          ],
          limit: 1,
        }),
      }
    );

    if (!searchResponse.ok) {
      console.error("HubSpot contact search failed:", searchResponse.status);
      return null;
    }

    const searchData = await searchResponse.json();
    const results = searchData.results || [];

    if (results.length > 0) {
      return results[0].id;
    }

    return null;
  } catch (error) {
    console.error("Error searching HubSpot contact:", error);
    return null;
  }
}

async function syncLeadToHubSpotContact(leadData, hubspotToken) {
  try {
    // Extract first and last name
    const nameParts = leadData.name.trim().split(/\s+/);
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";

    const contactProperties = {
      email: leadData.email,
      firstname: firstname,
      lastname: lastname,
      phone: leadData.phone,
    };

    // Add optional company field if present
    if (leadData.company) {
      contactProperties.company = leadData.company;
    }

    // Search for existing contact by email
    const existingContactId = await searchHubSpotContactByEmail(
      leadData.email,
      hubspotToken
    );

    let endpoint = "https://api.hubapi.com/crm/v3/objects/contacts";
    let method = "POST";
    let logAction = "created";

    // If contact exists, update it
    if (existingContactId) {
      endpoint = `${endpoint}/${existingContactId}`;
      method = "PATCH";
      logAction = "updated";
    }

    const contactResponse = await fetch(endpoint, {
      method: method,
      headers: {
        Authorization: `Bearer ${hubspotToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: contactProperties,
      }),
    });

    if (!contactResponse.ok) {
      const errorData = await contactResponse.json();
      console.error(
        `HubSpot contact ${logAction} failed:`,
        contactResponse.status,
        errorData
      );
      return { success: false, contactId: null, error: errorData };
    }

    const contactData = await contactResponse.json();
    const contactId = contactData.id;

    console.log(`HubSpot contact ${logAction}: ${contactId}`);

    // Log that a message was included without exposing PII
    if (leadData.message) {
      console.log(
        `Demo request included a message for HubSpot contact: ${contactId}`
      );
    }

    return { success: true, contactId, error: null };
  } catch (error) {
    console.error("Error syncing lead to HubSpot contact:", error);
    return { success: false, contactId: null, error: error.message };
  }
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Map environment variables with fallback support
  const RESEND_API_KEY = process.env.RESEND_API_KEY || process.env.TAXCHECK;
  const DEMO_TO_EMAIL = process.env.DEMO_TO_EMAIL || process.env.DEMO;
  const DEMO_FROM_EMAIL = process.env.DEMO_FROM_EMAIL || process.env.FROM;
  const HUBSPOT_TOKEN =
    process.env.HUBSPOT_ACCESS_TOKEN || process.env.HUBSPOT;

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

  // Validate email service environment variables
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY (TAXCHECK) not configured");
    return res.status(500).json({ error: "Email service not configured" });
  }

  if (!DEMO_TO_EMAIL) {
    console.error("DEMO_TO_EMAIL (DEMO) not configured");
    return res.status(500).json({ error: "Email service not configured" });
  }

  if (!DEMO_FROM_EMAIL) {
    console.error("DEMO_FROM_EMAIL (FROM) not configured");
    return res.status(500).json({ error: "Email service not configured" });
  }

  try {
    // Create Resend client only after validating environment variables
    const resend = new Resend(RESEND_API_KEY);

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
      from: DEMO_FROM_EMAIL,
      to: DEMO_TO_EMAIL,
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

    // Email sent successfully, now attempt HubSpot contact sync
    let crmSynced = false;

    if (!HUBSPOT_TOKEN) {
      console.log(
        "HubSpot token not configured; skipping CRM persistence."
      );
    } else {
      // Attempt to sync lead to HubSpot contact
      const syncResult = await syncLeadToHubSpotContact(
        { name, email, phone, company, message },
        HUBSPOT_TOKEN
      );

      if (syncResult.success) {
        crmSynced = true;
        console.log(
          `Lead successfully synced to HubSpot contact: ${syncResult.contactId}`
        );
      } else {
        console.error(
          "Failed to sync lead to HubSpot contact:",
          syncResult.error
        );
        // Don't fail the form - email was already sent successfully
      }
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Demo request sent successfully",
      id: data.id,
      crmSynced: crmSynced,
    });
  } catch (error) {
    console.error("Error processing demo request:", error);
    return res.status(500).json({
      error: "An error occurred while processing your request. Please try again later.",
    });
  }
}
