const ALLOWED_ORIGINS = new Set([
  "https://lankafreshandfrozen.com",
  "https://www.lankafreshandfrozen.com",
]);

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function escapeHtml(value) {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== "/api/enquiry") {
      return jsonResponse({ error: "Not found" }, 404);
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    const origin = request.headers.get("Origin");

    if (!origin || !ALLOWED_ORIGINS.has(origin)) {
      return jsonResponse({ error: "Forbidden" }, 403);
    }

    if (!env.RESEND_API_KEY) {
      return jsonResponse({ error: "Email service is not configured" }, 500);
    }

    try {
      const contentLength = Number(request.headers.get("Content-Length") || 0);

      if (contentLength > 10000) {
        return jsonResponse({ error: "Request too large" }, 413);
      }

      const rawBody = await request.text();

      if (rawBody.length > 10000) {
        return jsonResponse({ error: "Request too large" }, 413);
      }

      const data = JSON.parse(rawBody);

      const name = String(data.name || "").trim();
      const company = String(data.company || "").trim();
      const email = String(data.email || "").trim();
      const message = String(data.message || "").trim();
      const website = String(data.website || "").trim();

      // Honeypot spam protection
      if (website) {
        return jsonResponse({ success: true });
      }

      if (
        !name ||
        name.length > 100 ||
        !email ||
        email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        company.length > 150 ||
        !message ||
        message.length > 5000
      ) {
        return jsonResponse({ error: "Please check your form details." }, 400);
      }

      const safeName = escapeHtml(name);
      const safeCompany = escapeHtml(company || "Not provided");
      const safeEmail = escapeHtml(email);
      const safeMessage = escapeHtml(message);

      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Lanka Fresh Website <website@notify.lankafreshandfrozen.com>",
          to: ["info@lankafreshandfrozen.com"],
          reply_to: email,
          subject: "New Website Enquiry - Lanka Fresh",

          text: [
            "New website enquiry",
            "",
            `Name: ${name}`,
            `Company: ${company || "Not provided"}`,
            `Email: ${email}`,
            "",
            "Message:",
            message,
          ].join("\n"),

          html: `
              <h2>New Website Enquiry</h2>
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Company:</strong> ${safeCompany}</p>
              <p><strong>Email:</strong> ${safeEmail}</p>
              <p><strong>Message:</strong></p>
              <p>${safeMessage.replace(/\n/g, "<br>")}</p>
            `,
        }),
      });

      if (!resendResponse.ok) {
        const errorDetails = await resendResponse.text();
        console.error("Resend error:", errorDetails);

        return jsonResponse(
          { error: "Unable to send your enquiry right now." },
          502,
        );
      }

      return jsonResponse({ success: true });
    } catch (error) {
      console.error("Enquiry error:", error);

      return jsonResponse({ error: "Unable to process your enquiry." }, 500);
    }
  },
};
