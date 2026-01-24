import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIP } from '@/lib/rate-limit'
import { resend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/resend'
import { appendToSheet, SHEET_TABS } from '@/lib/google-sheets'

// Server-side validation schema
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  phone: z.string().max(20).optional(),
  subject: z.string().min(1).max(100),
  message: z.string().min(10).max(5000),
})

export async function POST(request: Request) {
  try {
    // Rate limiting: 5 requests per minute per IP
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(`contact:${clientIP}`, {
      windowMs: 60000,
      maxRequests: 5,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer dans quelques minutes.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(rateLimitResult.resetIn / 1000)),
          },
        }
      )
    }

    const data = await request.json()

    // Server-side validation
    const validationResult = contactSchema.safeParse(data)
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((e) => e.message).join(', ')
      return NextResponse.json(
        { error: `Données invalides: ${errors}` },
        { status: 400 }
      )
    }

    const validData = validationResult.data

    // Écriture dans Google Sheets
    await appendToSheet(SHEET_TABS.CONTACT, [
      validData.name,
      validData.email,
      validData.phone || '',
      validData.subject,
      validData.message,
    ])

    // Emails
    if (resend) {
      // Email notification à l'équipe
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        replyTo: validData.email,
        subject: `[Contact] ${validData.subject}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; }
              .header { background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); color: white; padding: 30px; text-align: center; }
              .header h1 { margin: 0; font-size: 22px; }
              .content { padding: 30px; background: #f8f9fa; }
              .section { background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; border: 1px solid #e5e5e5; }
              .field { margin-bottom: 15px; }
              .label { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
              .value { font-size: 15px; color: #1a1a1a; margin-top: 4px; }
              .message-box { background: #f0f4f8; padding: 20px; border-left: 3px solid #1e3a5f; margin-top: 20px; }
              .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>NOUVEAU MESSAGE</h1>
              </div>
              <div class="content">
                <div class="section">
                  <div class="field">
                    <div class="label">Nom</div>
                    <div class="value">${validData.name}</div>
                  </div>
                  <div class="field">
                    <div class="label">Email</div>
                    <div class="value"><a href="mailto:${validData.email}">${validData.email}</a></div>
                  </div>
                  ${validData.phone ? `
                  <div class="field">
                    <div class="label">Téléphone</div>
                    <div class="value"><a href="tel:${validData.phone}">${validData.phone}</a></div>
                  </div>
                  ` : ''}
                  <div class="field">
                    <div class="label">Sujet</div>
                    <div class="value">${validData.subject}</div>
                  </div>
                </div>
                <div class="message-box">
                  <div class="label">Message</div>
                  <div class="value" style="white-space: pre-wrap; margin-top: 10px;">${validData.message}</div>
                </div>
              </div>
              <div class="footer">
                Message reçu depuis salondescemartinique.com
              </div>
            </div>
          </body>
          </html>
        `,
      })

      // Email de confirmation
      await resend.emails.send({
        from: FROM_EMAIL,
        to: validData.email,
        subject: 'Merci pour votre message - Salon des CSE Martinique',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .header h1 { margin: 0; font-size: 20px; }
              .content { background: #f8f9fa; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 8px 8px; }
              .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>SALON DES CSE MARTINIQUE</h1>
              </div>
              <div class="content">
                <p>Bonjour <strong>${validData.name}</strong>,</p>
                <p>Merci pour votre message concernant "<em>${validData.subject}</em>".</p>
                <p>Notre équipe vous répondra dans les meilleurs délais.</p>
                <p style="margin-top: 30px;">
                  Cordialement,<br>
                  <strong>L'équipe du Salon des CSE Martinique</strong>
                </p>
              </div>
              <div class="footer">
                <p>Salon des CSE Martinique - L'événement de référence pour les CSE</p>
              </div>
            </div>
          </body>
          </html>
        `,
      })
    }

    return NextResponse.json(
      { message: 'Message envoyé avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur API contact:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
