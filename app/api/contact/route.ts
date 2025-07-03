import { NextRequest } from 'next/server';
import { contactFormSchema } from '@/lib/validations';
import { withErrorHandling, createResponse } from '@/lib/errors';
import { withMethods, withRateLimit } from '@/lib/middleware';
import nodemailer from 'nodemailer';
import { config } from '@/lib/config';

async function submitContactForm(req: NextRequest) {
  const body = await req.json();
  const { name, email, subject, message } = contactFormSchema.parse(body);

  // Create email transporter
  const transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.port === 465,
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  });

  // Email content
  const emailContent = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
    
    <hr>
    <p><small>This message was sent from the Portbl.Life contact form.</small></p>
  `;

  try {
    // Send email to support
    await transporter.sendMail({
      from: config.email.user,
      to: config.email.user, // Send to support email
      subject: `Contact Form: ${subject}`,
      html: emailContent,
      replyTo: email,
    });

    // Send confirmation email to user
    const confirmationContent = `
      <h2>Thank you for contacting us!</h2>
      <p>Hi ${name},</p>
      <p>We've received your message and will get back to you as soon as possible.</p>
      
      <h3>Your message:</h3>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      
      <p>Best regards,<br>The Portbl.Life Team</p>
    `;

    await transporter.sendMail({
      from: config.email.user,
      to: email,
      subject: 'Thank you for contacting Portbl.Life',
      html: confirmationContent,
    });

    return createResponse({
      message: 'Your message has been sent successfully. We\'ll get back to you soon!',
    });
  } catch (error) {
    console.error('Error sending contact form email:', error);
    return createResponse(
      { error: 'Failed to send message. Please try again later.' },
      500
    );
  }
}

export const POST = withErrorHandling(
  withRateLimit(5, 900000)( // 5 requests per 15 minutes
    withMethods(['POST'])(submitContactForm)
  )
);
