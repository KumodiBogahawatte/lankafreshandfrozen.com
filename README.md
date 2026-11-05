# Lanka Fresh – Corporate Website

Official corporate website for **Lanka Fresh Frozen Fish & Seafood Trading Co. LLC**, a UAE-based seafood trading business.

🌐 **Live Website:** https://lankafreshandfrozen.com  
🌐 **Alternative URL:** https://www.lankafreshandfrozen.com

## Overview

A responsive, single-page corporate website designed to introduce Lanka Fresh, showcase its seafood product range, communicate its sourcing network, and provide a direct enquiry channel for customers and business partners.

The website is built using standard web technologies and deployed through **Cloudflare Workers with static asset hosting**.

## Features

- Responsive corporate website for desktop, tablet, and mobile devices.
- Company introduction and business information.
- Seafood product categories and product imagery.
- Sourcing network overview.
- Quality and service commitment sections.
- Contact information and enquiry form.
- Mobile-friendly navigation.
- Automated copyright year.
- Server-side enquiry processing through Cloudflare Workers.
- Email notifications powered by Resend.
- Honeypot field for basic spam protection.
- Custom domain with HTTPS support.
- `www` to non-`www` domain redirection.

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling and responsive layouts |
| JavaScript | Navigation and form interactions |
| Cloudflare Workers | Server-side API and website hosting |
| Cloudflare Assets | Static website asset delivery |
| Resend API | Enquiry email notifications |
| Namecheap Private Email | Business email hosting |

## Project Structure

```text
lankafreshandfrozen.com/
│
├── assets/
│   └── logo.svg
│
├── src/
│   └── index.js
│
├── index.html
├── styles.css
├── script.js
├── wrangler.jsonc
├── .assetsignore
├── package.json
└── README.md
```

## Enquiry Form – Email Integration

The website includes an enquiry form that allows visitors to contact the business directly.

### Submission Workflow

1. A visitor submits the enquiry form.
2. The frontend sends the form data to `/api/enquiry`.
3. The Cloudflare Worker validates the submitted information.
4. The Worker forwards the enquiry to the Resend API.
5. Resend sends an email notification to the business inbox.

### Email Configuration

| Setting | Configuration |
|---|---|
| Sender | website@notify.lankafreshandfrozen.com |
| Recipient | info@lankafreshandfrozen.com |
| Email Service | Resend |
| Backend Endpoint | `/api/enquiry` |

The visitor's email address is included as the reply-to address so the business can respond directly.

### Environment Secret

The Worker requires the following encrypted secret:

```text
RESEND_API_KEY
```

Configure this secret in the Cloudflare Worker dashboard under **Settings → Variables and Secrets**.

**Security:** Never commit API keys, passwords, or other private credentials to the Git repository.

## Business Email

The official business email is hosted through Namecheap Private Email.

- **Email:** info@lankafreshandfrozen.com
- **Webmail:** https://privateemail.com/

Resend is used only for sending website enquiry notifications; it does not replace the business email hosting service.

## Deployment

The website is deployed using Cloudflare Workers with static assets and a server-side API.

### Deployment Configuration

- **Hosting Platform:** Cloudflare Workers
- **GitHub Repository:** https://github.com/KumodiBogahawatte/lankafreshandfrozen.com
- **Production Branch:** `main`
- **Deployment Command:** `npx wrangler deploy`
- **Custom Domain:** `lankafreshandfrozen.com`

### Deployment Process

1. Push the latest changes to the GitHub `main` branch.
2. Cloudflare retrieves the updated repository.
3. Wrangler deploys the Worker and static website assets.
4. The website is served through the configured custom domain.

### Important Configuration

The `wrangler.jsonc` file defines the Worker entry point and static asset configuration.

The `.assetsignore` file excludes internal and configuration files from public static asset delivery.

The `RESEND_API_KEY` must be configured as an encrypted Cloudflare Worker secret for enquiry email notifications to work.

## Before Making Changes

- Verify business contact details before updating them.
- Keep the enquiry form field names consistent with the backend validation.
- Preserve the `/api/enquiry` endpoint unless the frontend and backend are updated together.
- Do not expose API keys or email account passwords in frontend code.
- Keep the Resend sending domain DNS records intact.
- Avoid modifying Namecheap MX records without checking the existing email configuration.
- Test the enquiry form after deployment to confirm email delivery.
- Product and background images are illustrative and loaded from external image sources.

## Contact

**Lanka Fresh Frozen Fish & Seafood Trading Co. LLC**  
United Arab Emirates

- **Website:** https://lankafreshandfrozen.com
- **Email:** info@lankafreshandfrozen.com
- **Landline:** +971-4-852-9448
- **Mobile:** +971-56-969-2155

---

*Developed to establish Lanka Fresh's corporate online presence and provide a direct communication channel for customers and business partners.*
