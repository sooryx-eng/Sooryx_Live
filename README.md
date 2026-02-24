# Sooryx

Sooryx web platform built with Next.js (App Router).

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create your env file from template:

```bash
cp .env.example .env.local
```

3. Update `.env.local` values.

4. Run dev server:

```bash
npm run dev
```

## Required environment variables

- `DATABASE_URL`: PostgreSQL connection string.
- `MSG91_AUTH_KEY`: MSG91 authentication key for sending/verifying OTP.
- `MSG91_WIDGET_AUTH_KEY` (optional): dedicated auth key for `verifyAccessToken` API.
- `MSG91_TEMPLATE_ID`: MSG91 OTP template id used by BillShield signup/login.
- `NEXT_PUBLIC_MSG91_WIDGET_ID`: MSG91 widget id for Custom UI SDK methods.
- `NEXT_PUBLIC_MSG91_TOKEN_AUTH`: MSG91 client token for Custom UI SDK methods.
- `RESEND_API_KEY`: API key used by `/api/contact` to send emails.
- `CONTACT_FROM_EMAIL`: Verified sender address used for outbound contact emails.

## Contact form email flow

- Contact form page: `/contact`
- API route: `/api/contact`
- Recipient: `contact@sooryx.com`

If `RESEND_API_KEY` is missing, the contact API returns a configuration error.

## Build

```bash
npm run build
```

## Deploy (Vercel)

Set the same env vars in Vercel Project Settings before deploying.
