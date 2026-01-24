import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIP } from '@/lib/rate-limit'
import { resend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/resend'
import { appendToSheet, SHEET_TABS } from '@/lib/google-sheets'

// Server-side validation schema
const exhibitorSchema = z.object({
  companyName: z.string().min(2).max(200),
  sector: z.string().min(1).max(100),
  contactName: z.string().min(2).max(100),
  email: z.string().email().max(254),
  phone: z.string().min(10).max(20),
  address: z.string().min(5).max(300),
  message: z.string().max(2000).optional(),
})

export async function POST(request: Request) {
  try {
    // Rate limiting: 3 requests per minute per IP (stricter for exhibitors)
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(`exhibitor:${clientIP}`, {
      windowMs: 60000,
      maxRequests: 3,
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
    const validationResult = exhibitorSchema.safeParse(data)
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((e) => e.message).join(', ')
      return NextResponse.json(
        { error: `Données invalides: ${errors}` },
        { status: 400 }
      )
    }

    const validData = validationResult.data

    // Écriture dans Google Sheets
    await appendToSheet(SHEET_TABS.EXPOSANTS, [
      validData.companyName,
      validData.sector,
      validData.contactName,
      validData.email,
      validData.phone,
      validData.address,
      validData.message || '',
    ])

    // Emails
    if (resend) {
      // Email notification à l'équipe
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        replyTo: validData.email,
        subject: `[EXPOSANT] Nouvelle demande - ${validData.companyName}`,
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
              .badge { display: inline-block; background: #e74c3c; color: white; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 15px; }
              .content { padding: 30px; background: #f8f9fa; }
              .section { background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; border: 1px solid #e5e5e5; }
              .section-title { font-size: 12px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #e5e5e5; }
              .field { margin-bottom: 15px; }
              .label { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.3px; }
              .value { font-size: 15px; color: #1a1a1a; margin-top: 4px; }
              .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
              .cta { display: inline-block; background: #1e3a5f; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 20px; }
              .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>DEMANDE EXPOSANT</h1>
                <span class="badge">NOUVEAU</span>
              </div>
              <div class="content">
                <div class="section">
                  <div class="section-title">Entreprise</div>
                  <div class="grid">
                    <div class="field">
                      <div class="label">Nom</div>
                      <div class="value">${validData.companyName}</div>
                    </div>
                    <div class="field">
                      <div class="label">Secteur</div>
                      <div class="value">${validData.sector}</div>
                    </div>
                  </div>
                  <div class="field">
                    <div class="label">Adresse</div>
                    <div class="value">${validData.address}</div>
                  </div>
                </div>

                <div class="section">
                  <div class="section-title">Contact</div>
                  <div class="grid">
                    <div class="field">
                      <div class="label">Nom</div>
                      <div class="value">${validData.contactName}</div>
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

                ${validData.message ? `
                <div class="section">
                  <div class="section-title">Message</div>
                  <div class="value" style="white-space: pre-wrap;">${validData.message}</div>
                </div>
                ` : ''}

                <a href="mailto:${validData.email}" class="cta">Répondre à ${validData.contactName}</a>
              </div>
              <div class="footer">
                Demande reçue depuis salondescemartinique.com
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
        subject: 'Votre demande d\'exposition - Salon des CSE Martinique',
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
              .recap { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e5e5; }
              .recap-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
              .recap-item:last-child { border-bottom: none; }
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
                <p>Bonjour <strong>${validData.contactName}</strong>,</p>
                <p>Nous avons bien reçu votre demande d'exposition pour <strong>${validData.companyName}</strong>.</p>

                <div class="recap">
                  <div class="recap-item">
                    <span style="color: #888;">Entreprise</span>
                    <strong>${validData.companyName}</strong>
                  </div>
                  <div class="recap-item">
                    <span style="color: #888;">Secteur</span>
                    <strong>${validData.sector}</strong>
                  </div>
                </div>

                <div class="highlight">
                  <strong>Notre équipe commerciale vous contactera prochainement</strong><br>
                  <span style="font-size: 14px; color: #666;">pour discuter de votre participation</span>
                </div>

                <p>En attendant, n'hésitez pas à nous contacter pour toute question.</p>

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
      { message: 'Demande enregistrée avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur API exhibitor:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'enregistrement. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
