import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIP } from '@/lib/rate-limit'
import { resend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/resend'
import { appendToSheet, SHEET_TABS } from '@/lib/google-sheets'
import { validateSubmission, isObviousSpam, silentRejectResponse } from '@/lib/antispam'

const inscriptionSchema = z.object({
  entreprise: z.string().min(2).max(200),
  siret: z.string().regex(/^\d{14}$/),
  adresse: z.string().min(5).max(300),
  representant: z.string().min(2).max(100),
  telBureau: z.string().min(10).max(20),
  telPortable: z.string().min(10).max(20),
  email: z.string().email().max(254),
  facebook: z.string().max(100).optional().or(z.literal('')),
  instagram: z.string().max(100).optional().or(z.literal('')),
  siteWeb: z.string().max(200).optional().or(z.literal('')),
  produits: z.string().min(2).max(500),
  emplacement: z.literal(true),
  cadeauTombola: z.string().min(2).max(300),
  optionLogo: z.boolean().optional(),
  optionFacebook: z.boolean().optional(),
  optionRadio: z.boolean().optional(),
  optionEmailing: z.boolean().optional(),
  optionSacs: z.boolean().optional(),
  luEtApprouve: z.literal(true),
  signature: z.string().min(1),
  signatureCGV: z.string().min(1),
  pdfBase64: z.string().nullable().optional(),
  totalHT: z.number(),
  tva: z.number(),
  totalTTC: z.number(),
  honeypot: z.string().max(0).optional(),
})

function formatPrice(amount: number): string {
  return amount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(`inscription:${clientIP}`, {
      windowMs: 60000,
      maxRequests: 3,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer dans quelques minutes.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(rateLimitResult.resetIn / 1000)) } }
      )
    }

    const data = await request.json()

    // Anti-spam
    const spamCheck = await validateSubmission(data.honeypot, undefined)
    if (!spamCheck.success) {
      if (spamCheck.isSpam) return NextResponse.json(silentRejectResponse(), { status: 200 })
      return NextResponse.json({ error: spamCheck.error }, { status: 400 })
    }
    // Exclude base64 fields from spam check (signatures + PDF contain base64 that triggers false positives)
    const { pdfBase64: _pdf, signature: _sig, signatureCGV: _sigCgv, ...spamCheckData } = data
    if (isObviousSpam(spamCheckData)) {
      return NextResponse.json(silentRejectResponse(), { status: 200 })
    }

    // Validation
    const result = inscriptionSchema.safeParse(data)
    if (!result.success) {
      const errors = result.error.errors.map((e) => e.message).join(', ')
      return NextResponse.json({ error: `Données invalides: ${errors}` }, { status: 400 })
    }

    const d = result.data

    // Build options string
    const options = []
    if (d.optionLogo) options.push('Logo (250€)')
    if (d.optionFacebook) options.push('Facebook-Instagram (400€)')
    if (d.optionRadio) options.push('Radio (400€)')
    if (d.optionEmailing) options.push('Emailing (400€)')
    if (d.optionSacs) options.push('Sacs (800€)')

    // Google Sheets - tab "Inscriptions" in dedicated sheet
    try {
      await appendToSheet(SHEET_TABS.INSCRIPTIONS, [
        d.entreprise,
        d.siret,
        d.adresse,
        d.representant,
        d.telBureau,
        d.telPortable,
        d.email,
        d.facebook || '',
        d.instagram || '',
        d.siteWeb || '',
        d.produits,
        'Emplacement 5m² (905€)',
        d.cadeauTombola,
        options.join(' | ') || 'Aucune',
        formatPrice(d.totalHT) + '€',
        formatPrice(d.tva) + '€',
        formatPrice(d.totalTTC) + '€',
      ])
    } catch (sheetError) {
      console.error('[INSCRIPTION] Google Sheets FAILED:', sheetError)
      // Continue to send emails even if sheet fails
    }

    // Emails
    if (resend) {
      const attachments = d.pdfBase64
        ? [{ filename: `bulletin-inscription-${d.entreprise.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`, content: d.pdfBase64 }]
        : []

      // Email admin
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        replyTo: d.email,
        subject: `[INSCRIPTION] ${d.entreprise} - Salon CSE 2026 (${formatPrice(d.totalTTC)}€ TTC)`,
        html: buildAdminEmail(d, options),
        attachments,
      })

      // Email confirmation exposant
      await resend.emails.send({
        from: FROM_EMAIL,
        to: d.email,
        subject: 'Confirmation d\'inscription - Salon des CSE & COS de Martinique 2026',
        html: buildConfirmationEmail(d, options),
        attachments,
      })
    }

    return NextResponse.json({ message: 'Inscription enregistrée avec succès' }, { status: 200 })
  } catch (error) {
    console.error('Erreur API inscription:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'enregistrement. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}

// --- Email templates ---

function buildAdminEmail(d: z.infer<typeof inscriptionSchema>, options: string[]): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 0 auto; }
  .header { background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); color: white; padding: 30px; text-align: center; }
  .header h1 { margin: 0; font-size: 22px; }
  .badge { display: inline-block; background: #27ae60; color: white; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 15px; }
  .amount { display: inline-block; background: #d4a012; color: white; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 700; margin-top: 8px; }
  .content { padding: 30px; background: #f8f9fa; }
  .section { background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; border: 1px solid #e5e5e5; }
  .section-title { font-size: 12px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #e5e5e5; }
  .field { margin-bottom: 12px; }
  .label { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.3px; }
  .value { font-size: 15px; color: #1a1a1a; margin-top: 2px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .total-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
  .total-row.final { border-bottom: none; font-size: 18px; color: #1e3a5f; }
  .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
</style></head><body>
<div class="container">
  <div class="header">
    <h1>INSCRIPTION EXPOSANT</h1>
    <span class="badge">NOUVEAU</span><br>
    <span class="amount">${formatPrice(d.totalTTC)}€ TTC</span>
  </div>
  <div class="content">
    <div class="section">
      <div class="section-title">Entreprise</div>
      <div class="grid">
        <div class="field"><div class="label">Nom</div><div class="value">${d.entreprise}</div></div>
        <div class="field"><div class="label">SIRET</div><div class="value">${d.siret}</div></div>
      </div>
      <div class="field"><div class="label">Adresse</div><div class="value">${d.adresse}</div></div>
      <div class="field"><div class="label">Représentant</div><div class="value">${d.representant}</div></div>
      <div class="field"><div class="label">Produits/Services</div><div class="value">${d.produits}</div></div>
    </div>

    <div class="section">
      <div class="section-title">Contact</div>
      <div class="grid">
        <div class="field"><div class="label">Email</div><div class="value"><a href="mailto:${d.email}">${d.email}</a></div></div>
        <div class="field"><div class="label">Tel Bureau</div><div class="value">${d.telBureau}</div></div>
        <div class="field"><div class="label">Tel Portable</div><div class="value">${d.telPortable}</div></div>
        ${d.siteWeb ? `<div class="field"><div class="label">Site web</div><div class="value">${d.siteWeb}</div></div>` : ''}
      </div>
      ${d.facebook ? `<div class="field"><div class="label">Facebook</div><div class="value">${d.facebook}</div></div>` : ''}
      ${d.instagram ? `<div class="field"><div class="label">Instagram</div><div class="value">${d.instagram}</div></div>` : ''}
    </div>

    <div class="section">
      <div class="section-title">Prestations réservées</div>
      <div class="field"><div class="label">Emplacement</div><div class="value">5m² + table + 4 chaises + électricité — 905,00€ HT</div></div>
      <div class="field"><div class="label">Cadeau Tombola</div><div class="value">${d.cadeauTombola}</div></div>
      ${options.length > 0 ? `<div class="field"><div class="label">Options</div><div class="value">${options.join('<br>')}</div></div>` : ''}
      <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e5e5;">
        <div class="total-row"><span>Total HT</span><strong>${formatPrice(d.totalHT)}€</strong></div>
        <div class="total-row"><span>TVA 8,5%</span><strong>${formatPrice(d.tva)}€</strong></div>
        <div class="total-row final"><span><strong>Total TTC</strong></span><strong>${formatPrice(d.totalTTC)}€</strong></div>
      </div>
    </div>

    ${d.pdfBase64 ? '<p style="margin-bottom:20px;padding:12px;background:#e8f4fc;border-radius:8px;font-size:13px;color:#1e3a5f;"><strong>📎 Le bulletin d\'inscription complété est joint à cet email en pièce jointe.</strong></p>' : ''}

    <a href="mailto:${d.email}" style="display:inline-block;background:#1e3a5f;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;">Répondre à ${d.representant}</a>
  </div>
  <div class="footer">Inscription reçue depuis salondescemartinique.com</div>
</div></body></html>`
}

function buildConfirmationEmail(d: z.infer<typeof inscriptionSchema>, options: string[]): string {
  const acompte = formatPrice(d.totalTTC / 2)

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8">
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
  .warning { background: #fff8e1; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d4a012; }
  .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
</style></head><body>
<div class="container">
  <div class="header">
    <h1>SALON DES CSE & COS DE MARTINIQUE 2026</h1>
    <p style="margin:8px 0 0;opacity:0.8;">Confirmation d'inscription exposant</p>
  </div>
  <div class="content">
    <p>Bonjour <strong>${d.representant}</strong>,</p>
    <p>Nous avons bien reçu votre bulletin d'inscription pour <strong>${d.entreprise}</strong> au Salon des CSE & COS de Martinique 2026.</p>

    <div class="recap">
      <div class="recap-item"><span style="color:#888;">Entreprise</span><strong>${d.entreprise}</strong></div>
      <div class="recap-item"><span style="color:#888;">Emplacement</span><strong>5m² équipé — 905,00€ HT</strong></div>
      <div class="recap-item"><span style="color:#888;">Cadeau Tombola</span><strong>${d.cadeauTombola}</strong></div>
      ${options.map(o => `<div class="recap-item"><span style="color:#888;">Option</span><strong>${o}</strong></div>`).join('')}
      <div class="recap-item" style="border-top:2px solid #1e3a5f;margin-top:10px;padding-top:12px;">
        <span style="color:#1e3a5f;font-weight:700;">TOTAL TTC</span>
        <strong style="color:#1e3a5f;font-size:18px;">${formatPrice(d.totalTTC)}€</strong>
      </div>
    </div>

    <div class="warning">
      <strong>Prochaine étape — Validation définitive de votre inscription :</strong><br><br>
      Votre inscription sera définitive une fois que vous aurez procédé au virement d'acompte de 50%, soit <strong>${acompte}€ TTC</strong>.<br>
      Les virements doivent être émis à l'ordre de <strong>ANTILLES SALONS</strong>.<br><br>
      <a href="https://www.salondescemartinique.com/docs/rib-antilles-salons.pdf" style="display:inline-block;background:#1e3a5f;color:white;padding:8px 18px;border-radius:6px;text-decoration:none;font-weight:600;font-size:13px;">Télécharger notre RIB</a><br><br>
      <small>Acompte à signature et transmission de bulletin - Solde dû au 15 septembre 2026.</small>
    </div>

    <div class="highlight">
      <strong>Jeudi 1er Octobre 2026</strong><br>
      <span style="font-size:14px;color:#666;">Palais des Congrès de Madiana, Schœlcher</span><br>
      <small>Installation : Mercredi 30 Septembre de 15h à 18h</small>
    </div>

    ${d.pdfBase64 ? '<p><em>Votre bulletin d\'inscription complété est joint à cet email en pièce jointe.</em></p>' : ''}

    <p style="margin-top:30px;">
      Cordialement,<br>
      <strong>L'équipe du Salon des CSE & COS de Martinique</strong><br>
      <small>Tél. : 05 96 61 21 21 - 06 96 26 30 96</small>
    </p>
  </div>
  <div class="footer">
    <p>Salon des CSE & COS de Martinique - 35ème édition</p>
  </div>
</div></body></html>`
}
