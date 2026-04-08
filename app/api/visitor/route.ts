import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIP } from '@/lib/rate-limit'
import { sendEmail, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/resend'
import { appendToSheet, SHEET_TABS } from '@/lib/google-sheets'
import { validateSubmission, isObviousSpam, silentRejectResponse } from '@/lib/antispam'

// Server-side validation schema
const visitorSchema = z.object({
  fullName: z.string().min(2).max(100),
  position: z.string().min(2).max(100),
  company: z.string().min(2).max(200),
  cseName: z.string().min(2).max(200),
  email: z.string().email().max(254),
  phone: z.string().min(10).max(20),
  website: z.string().optional(), // Honeypot
  participants: z.string().optional(),
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

    // Anti-spam validation (honeypot)
    const spamCheck = await validateSubmission(data.website, undefined)
    if (!spamCheck.success) {
      if (spamCheck.isSpam) {
        // Silent reject for bots
        return NextResponse.json(silentRejectResponse(), { status: 200 })
      }
      return NextResponse.json({ error: spamCheck.error }, { status: 400 })
    }

    // Check for obvious spam patterns
    if (isObviousSpam(data)) {
      return NextResponse.json(silentRejectResponse(), { status: 200 })
    }

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
    const sheetResult = await appendToSheet(SHEET_TABS.VISITEURS, [
      validData.fullName,
      validData.position,
      validData.company,
      validData.cseName,
      validData.email,
      validData.phone,
      validData.participants || '',
    ])
    if (!sheetResult) {
      console.warn('[Visitor] Google Sheets: écriture ignorée ou échouée')
    }

    // Emails
    const emailErrors: string[] = []

    // Email notification à l'équipe
    const adminResult = await sendEmail({
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
    if (!adminResult.success) {
      emailErrors.push(`Admin: ${adminResult.error}`)
    }

    // Email de confirmation au visiteur
    const confirmResult = await sendEmail({
      from: FROM_EMAIL,
      to: validData.email,
      subject: 'Demande d\'inscription reçue - Salon des CSE Martinique',
      html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; background: #f5f5f5; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0; }
              .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
              .header p { margin: 10px 0 0; opacity: 0.9; font-size: 14px; }
              .content { background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
              .success-icon { width: 70px; height: 70px; background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%); border-radius: 50%; margin: 0 auto 25px; display: flex; align-items: center; justify-content: center; }
              .success-icon svg { width: 35px; height: 35px; }
              .recap { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 25px 0; border-left: 4px solid #1e3a5f; }
              .recap-title { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
              .recap-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
              .recap-item:last-child { border-bottom: none; }
              .recap-label { color: #666; }
              .recap-value { font-weight: 600; color: #1a1a1a; }
              .info-box { background: #e8f4fc; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center; }
              .info-box p { margin: 0; color: #1e3a5f; }
              .footer { text-align: center; padding: 25px; color: #888; font-size: 12px; }
              .footer a { color: #1e3a5f; text-decoration: none; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Salon des CSE Martinique</h1>
                <p>L'événement de référence pour les Comités Sociaux et Économiques</p>
              </div>
              <div class="content">
                <div class="success-icon">
                  <svg fill="white" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                </div>

                <h2 style="text-align: center; color: #1a1a1a; margin: 0 0 10px;">Demande d'inscription transmise !</h2>
                <p style="text-align: center; color: #666; margin: 0 0 25px;">Bonjour <strong>${validData.fullName}</strong>, votre demande d'inscription a bien été transmise à notre équipe organisatrice.</p>

                <div class="recap">
                  <div class="recap-title">Récapitulatif de votre inscription</div>
                  <div class="recap-item">
                    <span class="recap-label">Nom</span>
                    <span class="recap-value">${validData.fullName}</span>
                  </div>
                  <div class="recap-item">
                    <span class="recap-label">Fonction</span>
                    <span class="recap-value">${validData.position}</span>
                  </div>
                  <div class="recap-item">
                    <span class="recap-label">Entreprise</span>
                    <span class="recap-value">${validData.company}</span>
                  </div>
                  <div class="recap-item">
                    <span class="recap-label">CSE / COS</span>
                    <span class="recap-value">${validData.cseName}</span>
                  </div>
                </div>

                <div class="info-box">
                  <p><strong>📬 Prochaine étape</strong></p>
                  <p style="margin-top: 8px; font-size: 14px;">L'équipe organisatrice du Salon va vérifier votre inscription et reviendra vers vous dès que possible pour vous confirmer votre participation.</p>
                </div>

                <p style="margin-top: 30px;">Nous vous remercions pour votre intérêt et restons à votre disposition pour toute question.</p>

                <p style="margin-top: 25px;">
                  À très bientôt,<br>
                  <strong>L'équipe du Salon des CSE Martinique</strong>
                </p>
              </div>
              <div class="footer">
                <p>Salon des CSE Martinique<br>
                <a href="https://salondescemartinique.com">salondescemartinique.com</a></p>
              </div>
            </div>
          </body>
          </html>
        `,
    })
    if (!confirmResult.success) {
      emailErrors.push(`Confirmation: ${confirmResult.error}`)
    }

    if (emailErrors.length > 0) {
      console.error(`[Visitor] Erreurs email: ${emailErrors.join(' | ')}`)
    }

    return NextResponse.json(
      {
        message: 'Inscription enregistrée avec succès',
        ...(emailErrors.length > 0 && { emailWarning: 'Certains emails n\'ont pas pu être envoyés' }),
        ...(!sheetResult && { sheetWarning: 'Données non enregistrées dans le tableur' }),
      },
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
