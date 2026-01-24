import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIP } from '@/lib/rate-limit'
import { resend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/resend'
import { appendToSheet, SHEET_TABS } from '@/lib/google-sheets'

// Server-side validation schema
const visitorSchema = z.object({
  fullName: z.string().min(2).max(100),
  position: z.string().min(2).max(100),
  company: z.string().min(2).max(200),
  cseName: z.string().min(2).max(200),
  email: z.string().email().max(254),
  phone: z.string().min(10).max(20),
})

export async function POST(request: Request) {
  try {
    // Rate limiting: 5 requests per minute per IP
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(`visitor:${clientIP}`, {
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
    const validationResult = visitorSchema.safeParse(data)
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((e) => e.message).join(', ')
      return NextResponse.json(
        { error: `Données invalides: ${errors}` },
        { status: 400 }
      )
    }

    const validData = validationResult.data

    // Écriture dans Google Sheets
    await appendToSheet(SHEET_TABS.VISITEURS, [
      validData.fullName,
      validData.position,
      validData.company,
      validData.cseName,
      validData.email,
      validData.phone,
    ])

    // Emails
    if (resend) {
      // Email notification à l'équipe
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        replyTo: validData.email,
        subject: `[VISITEUR] Nouvelle inscription - ${validData.fullName} (${validData.cseName})`,
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
              .badge { display: inline-block; background: #27ae60; color: white; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 15px; }
              .content { padding: 30px; background: #f8f9fa; }
              .section { background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; border: 1px solid #e5e5e5; }
              .field { margin-bottom: 15px; }
              .label { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.3px; }
              .value { font-size: 15px; color: #1a1a1a; margin-top: 4px; }
              .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
              .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>INSCRIPTION VISITEUR</h1>
                <span class="badge">NOUVEAU</span>
              </div>
              <div class="content">
                <div class="section">
                  <div class="grid">
                    <div class="field">
                      <div class="label">Nom complet</div>
                      <div class="value">${validData.fullName}</div>
                    </div>
                    <div class="field">
                      <div class="label">Fonction</div>
                      <div class="value">${validData.position}</div>
                    </div>
                    <div class="field">
                      <div class="label">Entreprise</div>
                      <div class="value">${validData.company}</div>
                    </div>
                    <div class="field">
                      <div class="label">CSE</div>
                      <div class="value">${validData.cseName}</div>
                    </div>
                    <div class="field">
                      <div class="label">Email</div>
                      <div class="value"><a href="mailto:${validData.email}">${validData.email}</a></div>
                    </div>
                    <div class="field">
                      <div class="label">Téléphone</div>
                      <div class="value"><a href="tel:${validData.phone}">${validData.phone}</a></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="footer">
                Inscription reçue depuis salondescemartinique.com
              </div>
            </div>
          </body>
          </html>
        `,
      })

      // Email de confirmation avec invitation
      await resend.emails.send({
        from: FROM_EMAIL,
        to: validData.email,
        subject: 'Votre inscription au Salon des CSE Martinique',
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
              .badge-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px dashed #1e3a5f; text-align: center; }
              .badge-title { color: #1e3a5f; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
              .badge-name { font-size: 24px; font-weight: bold; color: #1a1a1a; margin: 10px 0; }
              .badge-info { color: #666; font-size: 14px; }
              .highlight { background: #e8f4fc; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
              .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>SALON DES CSE MARTINIQUE</h1>
              </div>
              <div class="content">
                <p>Bonjour <strong>${validData.fullName}</strong>,</p>
                <p>Votre inscription au Salon des CSE Martinique est confirmée !</p>

                <div class="badge-box">
                  <div class="badge-title">Votre badge visiteur</div>
                  <div class="badge-name">${validData.fullName}</div>
                  <div class="badge-info">${validData.position} - ${validData.company}</div>
                  <div class="badge-info" style="margin-top: 5px;">${validData.cseName}</div>
                </div>

                <div class="highlight">
                  <strong>Présentez cet email à l'entrée du salon</strong><br>
                  <span style="font-size: 14px; color: #666;">pour retirer votre badge</span>
                </div>

                <p>Nous avons hâte de vous accueillir !</p>

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
      { message: 'Inscription enregistrée avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur API visitor:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'enregistrement. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
