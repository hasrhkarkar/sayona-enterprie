const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

app.post('/contact', async (req, res) => {
  try {
    const body = req.body;
    const isResend = process.env.EMAIL_PROVIDER === 'resend';

    // Shared configuration
    const contactEmail = process.env.CONTACT_EMAIL || 'divyaminternational08@gmail.com';

    if (isResend) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      const data = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: contactEmail,
        reply_to: body.email,
        subject: body.subject || 'Website enquiry',
        text: `Name: ${body.name || ''}\nEmail: ${body.email || ''}\n\n${body.message || ''}`,
        html: `<p><strong>Name:</strong> ${body.name || ''}</p><p><strong>Email:</strong> ${body.email || ''}</p><p>${(body.message || '').replace(/\n/g, '<br/>')}</p>`,
      });

      if (data.error) {
        throw new Error(data.error.message);
      }
      return res.status(200).json({ ok: true, data });
    }

    // Fallback: Nodemailer Logic
    else {
      // Read SMTP settings from environment variables
      const host = process.env.SMTP_HOST;
      const port = Number(process.env.SMTP_PORT || 587);
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;

      let transporter;
      let usingTestAccount = false;

      if (!host || !user || !pass) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('SMTP not configured — creating Ethereal test account (dev only).');
          const testAccount = await nodemailer.createTestAccount();
          transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: { user: testAccount.user, pass: testAccount.pass },
          });
          usingTestAccount = true;
        } else {
          return res.status(500).json({ error: 'SMTP not configured on server.' });
        }
      } else {
        transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465, // true for 465, false for other ports
          auth: { user, pass },
        });
      }

      // verify connection configuration
      try {
        await transporter.verify();
      } catch (verifyErr) {
        console.error('SMTP verify failed:', verifyErr);
        return res.status(500).json({ error: 'SMTP verify failed', details: verifyErr?.message || String(verifyErr) });
      }

      const info = await transporter.sendMail({
        from: `"${body.name || 'Website Contact'}" <${user}>`, // user is usually the authenticated email
        to: contactEmail,
        subject: body.subject || 'Website enquiry',
        text: `Name: ${body.name || ''}\nEmail: ${body.email || ''}\n\n${body.message || ''}`,
        html: `<p><strong>Name:</strong> ${body.name || ''}</p><p><strong>Email:</strong> ${body.email || ''}</p><p>${(body.message || '').replace(/\n/g, '<br/>')}</p>`,
      });

      const responsePayload = { ok: true, info };
      if (usingTestAccount) {
        const preview = nodemailer.getTestMessageUrl(info);
        if (preview) responsePayload.preview = preview;
        responsePayload.note = 'Sent via Ethereal test account (dev only). Use preview URL to view the message.';
      }

      return res.status(200).json(responsePayload);
    }

  } catch (err) {
    console.error('Error in /contact:', err);
    return res.status(500).json({ error: err?.message || String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
