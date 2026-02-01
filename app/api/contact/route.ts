import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

type Body = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();

    // Read SMTP settings from environment variables
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    let transporter: nodemailer.Transporter;
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
        return NextResponse.json({ error: 'SMTP not configured on server.' }, { status: 500 });
      }
    } else {
      transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
    }

    const toAddress = 'divyaminternation08@gmail.com';

    // verify connection configuration
    try {
      await transporter.verify();
    } catch (verifyErr: any) {
      console.error('SMTP verify failed:', verifyErr);
      return NextResponse.json({ error: 'SMTP verify failed', details: verifyErr?.message || String(verifyErr) }, { status: 500 });
    }

    const info = await transporter.sendMail({
      from: `${body.name || 'Website Contact'} <${user}>`,
      to: toAddress,
      subject: body.subject || 'Website enquiry',
      text: `Name: ${body.name || ''}\nEmail: ${body.email || ''}\n\n${body.message || ''}`,
      html: `<p><strong>Name:</strong> ${body.name || ''}</p><p><strong>Email:</strong> ${body.email || ''}</p><p>${(body.message || '').replace(/\n/g, '<br/>')}</p>`,
    });

    const responsePayload: any = { ok: true, info };
    if (usingTestAccount) {
      // nodemailer exposes a preview URL for Ethereal test accounts
      const preview = nodemailer.getTestMessageUrl(info);
      if (preview) responsePayload.preview = preview;
      responsePayload.note = 'Sent via Ethereal test account (dev only). Use preview URL to view the message.';
    }

    return NextResponse.json(responsePayload);
  } catch (err: any) {
    console.error('Error in /api/contact:', err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
