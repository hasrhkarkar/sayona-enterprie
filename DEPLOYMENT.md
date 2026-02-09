# Deployment Guide

This project is now split into two parts:
1. **Frontend**: Next.js (deployed to Vercel)
2. **Backend**: Express.js (deployed to Render)

## 1. Deploying Backend to Render

1.  Push your latest changes to GitHub.
2.  Log in to [Render](https://render.com/).
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository.
5.  **Root Directory**: Set this to `backend`.
    *   *Important*: This tells Render to look inside the `backend` folder for the app.
6.  **Build Command**: `npm install`
7.  **Start Command**: `npm start`
8.  **Environment Variables**:
    *   Add the following secrets (Advanced button):
        *   `EMAIL_PROVIDER`: `resend` (or `nodemailer` if using SMTP)
        *   `RESEND_API_KEY`: Your Resend API key.
        *   `CONTACT_EMAIL`: The email address to receive enquiries.
        *   *(If using SMTP instead of Resend)*: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`.
9.  Click **Create Web Service**.
10. Once deployed, copy the **Service URL** (e.g., `https://sayona-backend.onrender.com`).

### Custom Domain for Backend (Optional)
If you want your backend to be at `api.sayonaenterprise.com`:
1.  In Render Dashboard, go to **Settings** -> **Custom Domains**.
2.  Add `api.sayonaenterprise.com`.
3.  Render will give you a CNAME record (e.g., `sayona-backend.onrender.com`).
4.  Go to your Domain Registrar (where you bought the domain).
5.  Add a **CNAME** record:
    *   **Host**: `api`
    *   **Value**: `sayona-backend.onrender.com` (or whatever Render provides).

## 2. Deploying Frontend to Vercel

1.  Log in to [Vercel](https://vercel.com/new).
2.  Import your GitHub repository.
3.  **Root Directory**: Keep as just `/` (default).
4.  **Framework Preset**: Next.js.
5.  **Environment Variables**:
    *   Add `NEXT_PUBLIC_API_URL` and set its value to your Backend URL.
        *   If using default Render URL: `https://sayona-backend.onrender.com/contact`
        *   If using custom domain: `https://api.sayonaenterprise.com/contact`
6.  Click **Deploy**.

### Custom Domain for Frontend (`sayonaenterprise.com`)
1.  In Vercel Dashboard, go to **Settings** -> **Domains**.
2.  Add `sayonaenterprise.com`.
3.  Also add `www.sayonaenterprise.com` (Vercel usually suggests this).
4.  Vercel will show you the DNS records to add.
5.  Go to your Domain Registrar.
6.  Add the **A Record** (for root domain `@`):
    *   **Type**: A
    *   **Host**: `@`
    *   **Value**: `76.76.21.21` (Vercel's IP).
7.  Add the **CNAME Record** (for `www`):
    *   **Type**: CNAME
    *   **Host**: `www`
    *   **Value**: `cname.vercel-dns.com`.

## 3. Verification

1.  Visit `https://sayonaenterprise.com`.
2.  Go to the Contact page.
3.  Submit the form.
4.  Check if you receive the email.
