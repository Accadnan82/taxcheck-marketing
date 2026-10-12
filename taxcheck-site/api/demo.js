import { Resend } from "resend";

/**
 * POST /api/demo
 * Handles demo request submissions and sends email notifications.
 * Persists leads to HubSpot as contacts if token is configured.
 * Phase 2: Creates a HubSpot Deal after successful contact sync.
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
 * - HUBSPOT_PIPELINE_ID or HUBSPOTPIPELINE: HubSpot pipeline ID for deals
 * - HUBSPOT_STAGE_NEW_DEMO or HUBSPOTSTAGE: HubSpot deal stage ID
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
    const nameParts = leadData.name.trim().split(/\s+/);
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";

    const contactProperties = {
      email: leadData.email,
      firstname: firstname,
      lastname: lastname,
      phone: leadData.phone,
    };

    if (leadData.company) {
      contactProperties.company = leadData.company;
    }

    const existingContactId = await searchHubSpotContactByEmail(
      leadData.email,
      hubspotToken
    );

    let endpoint = "https://api.hubapi.com/crm/v3/objects/contacts";
    let method = "POST";
    let logAction = "created";

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

async function createHubSpotDeal(
  contactId,
  leadData,
  hubspotToken,
  pipelineId,
  stageId
) {
  try {
    const dealLabel = leadData.company || leadData.name;
    const dealName = `TaxCheck Demo Request - ${dealLabel}`;

    const dealProperties = {
      dealname: dealName,
      pipeline: pipelineId,
      dealstage: stageId,
    };

    const dealBody = {
      properties: dealProperties,
      associations: [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: "HUBSPOT_DEFINED",
              associationTypeId: 3,
            },
          ],
        },
      ],
    };

    const dealResponse = await fetch(
      "https://api.hubapi.com/crm/v3/objects/deals",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dealBody),
      }
    );

    if (!dealResponse.ok) {
      const errorData = await dealResponse.json();
      console.error(
        "HubSpot deal creation failed:",
        dealResponse.status,
        JSON.stringify(errorData)
      );
      return { success: false, dealId: null };
    }

    const dealData = await dealResponse.json();
    const dealId = dealData.id;

    console.log(
      `HubSpot deal created: ${dealId}, associated with contact: ${contactId}`
    );

    return { success: true, dealId };
  } catch (error) {
    console.error("Error creating HubSpot deal:", error);
    return { success: false, dealId: null };
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY || process.env.TAXCHECK;
  const DEMO_TO_EMAIL = process.env.DEMO_TO_EMAIL || process.env.DEMO;
  const DEMO_FROM_EMAIL = process.env.DEMO_FROM_EMAIL || process.env.FROM;
  const HUBSPOT_TOKEN =
    process.env.HUBSPOT_ACCESS_TOKEN || process.env.HUBSPOT;
  const HUBSPOT_PIPELINE_ID =
    process.env.HUBSPOT_PIPELINE_ID || process.env.HUBSPOTPIPELINE;
  const HUBSPOT_STAGE_ID =
    process.env.HUBSPOT_STAGE_NEW_DEMO || process.env.HUBSPOTSTAGE;

  const { name, email, phone, company = "", message = "" } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      error: "Missing required fields: name, email, phone",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

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
    const resend = new Resend(RESEND_API_KEY);

    const submissionTime = new Date().toLocaleString("en-AE", {
      timeZone: "Asia/Dubai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

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

    const { data, error } = await resend.emails.send({
      from: DEMO_FROM_EMAIL,
      to: DEMO_TO_EMAIL,
      replyTo: email,
      subject: emailSubject,
      text: emailBody,
    });

    if (error) {
      console.error("Resend email send failed:", error);
      return res.status(500).json({
        error: "Failed to send email. Please try again later.",
      });
    }

    if (!data?.id) {
      console.error("Unexpected Resend response - missing email ID:", data);
      return res.status(500).json({
        error: "Failed to send email. Please try again later.",
      });
    }

    let crmSynced = false;
    let dealCreated = false;
    let syncResult = { success: false, contactId: null };

    if (!HUBSPOT_TOKEN) {
      console.log("HubSpot token not configured; skipping CRM persistence.");
    } else {
      syncResult = await syncLeadToHubSpotContact(
        { name, email, phone, company, message },
        HUBSPOT_TOKEN
      );

      if (syncResult.success) {
        crmSynced = true;
        console.log(
          `Lead successfully synced to HubSpot contact: ${syncResult.contactId}`
        );

        if (!HUBSPOT_PIPELINE_ID) {
          console.log(
            "HUBSPOT_PIPELINE_ID (HUBSPOTPIPELINE) not configured; skipping deal creation."
          );
        } else if (!HUBSPOT_STAGE_ID) {
          console.log(
            "HUBSPOT_STAGE_ID (HUBSPOT_STAGE_NEW_DEMO / HUBSPOTSTAGE) not configured; skipping deal creation."
          );
        } else {
          const dealResult = await createHubSpotDeal(
            syncResult.contactId,
            { name, company },
            HUBSPOT_TOKEN,
            HUBSPOT_PIPELINE_ID,
            HUBSPOT_STAGE_ID
          );

          if (dealResult.success) {
            dealCreated = true;
          } else {
            console.error(
              "HubSpot deal creation failed but form submission will still succeed."
            );
          }
        }
      } else {
        console.error(
          "Failed to sync lead to HubSpot contact:",
          syncResult.error
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: "Demo request sent successfully",
      id: data.id,
      crmSynced: crmSynced,
      dealCreated: dealCreated,
    });
  } catch (error) {
    console.error("Error processing demo request:", error);
    return res.status(500).json({
      error: "An error occurred while processing your request. Please try again later.",
    });
  }
}
