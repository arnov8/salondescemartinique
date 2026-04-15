import { NextResponse } from 'next/server'
import { sendEmail, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/resend'
import { appendToSheet, SHEET_TABS } from '@/lib/google-sheets'

export const dynamic = 'force-dynamic'

const STATUS_PIN = '8291'

interface ServiceCheck {
  ok: boolean
  error?: string
  detail?: string
}

export async function POST(request: Request) {
  try {
    const { pin } = await request.json()

    if (pin !== STATUS_PIN) {
      return NextResponse.json({ error: 'Code PIN incorrect' }, { status: 401 })
    }

    const timestamp = new Date().toLocaleString('fr-FR', {
      timeZone: 'America/Martinique',
      dateStyle: 'long',
      timeStyle: 'medium',
    })

    // Check environment variables
    const env = {
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      ADMIN_EMAIL: !!process.env.ADMIN_EMAIL,
      FROM_EMAIL: !!process.env.FROM_EMAIL,
      SHEET_ID: !!process.env.SHEET_ID,
      INSCRIPTION_SHEET_ID: !!process.env.INSCRIPTION_SHEET_ID,
      GOOGLE_CREDENTIALS: !!process.env.GOOGLE_CREDENTIALS,
    }

    // --- Test Resend (email sending) ---
    let emailAdmin: ServiceCheck = { ok: false }
    let emailConfirmation: ServiceCheck = { ok: false }

    // Test 1: Email admin notification
    try {
      const result = await sendEmail({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: '[STATUT] Test email admin',
        html: `<p>Test automatique - vérification envoi emails admin.<br>Date: ${timestamp}</p>`,
      })
      emailAdmin = { ok: result.success, error: result.error, detail: result.id }
    } catch (error) {
      emailAdmin = { ok: false, error: String(error) }
    }

    // Test 2: Email confirmation (send to admin as test recipient)
    try {
      const result = await sendEmail({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: '[STATUT] Test email confirmation visiteur',
        html: `<p>Test automatique - vérification envoi emails de confirmation aux visiteurs/exposants.<br>Date: ${timestamp}</p>`,
      })
      emailConfirmation = { ok: result.success, error: result.error, detail: result.id }
    } catch (error) {
      emailConfirmation = { ok: false, error: String(error) }
    }

    // --- Test Google Sheets ---
    // Test onglet Visiteurs (SHEET_ID)
    let sheetVisiteurs: ServiceCheck = { ok: false }
    try {
      const result = await appendToSheet(SHEET_TABS.VISITEURS, [
        '[STATUT-CHECK]',
        'Test',
        'Test',
        'Test',
        'test@statut.check',
        '0000000000',
        '',
      ])
      sheetVisiteurs = { ok: !!result }
    } catch (error) {
      sheetVisiteurs = { ok: false, error: String(error) }
    }

    // Test onglet Exposants (SHEET_ID)
    let sheetExposants: ServiceCheck = { ok: false }
    try {
      const result = await appendToSheet(SHEET_TABS.EXPOSANTS, [
        '[STATUT-CHECK]',
        'Test',
        'Test',
        'test@statut.check',
        '0000000000',
        'Test',
        '',
      ])
      sheetExposants = { ok: !!result }
    } catch (error) {
      sheetExposants = { ok: false, error: String(error) }
    }

    // Test onglet Contact (SHEET_ID)
    let sheetContact: ServiceCheck = { ok: false }
    try {
      const result = await appendToSheet(SHEET_TABS.CONTACT, [
        '[STATUT-CHECK]',
        'test@statut.check',
        '',
        'Test automatique',
        'Ligne de test - peut être supprimée',
      ])
      sheetContact = { ok: !!result }
    } catch (error) {
      sheetContact = { ok: false, error: String(error) }
    }

    // Test onglet Inscriptions (INSCRIPTION_SHEET_ID - sheet séparé)
    let sheetInscription: ServiceCheck = { ok: false }
    try {
      const result = await appendToSheet(SHEET_TABS.INSCRIPTIONS, [
        '[STATUT-CHECK]',
        '00000000000000',
        'Test',
        'Test',
        '0000000000',
        '0000000000',
        'test@statut.check',
        '', '', '', 'Test',
        'Test', 'Test', 'Aucune',
        '0€', '0€', '0€',
      ])
      sheetInscription = { ok: !!result }
    } catch (error) {
      sheetInscription = { ok: false, error: String(error) }
    }

    // Build per-form status
    const formulaires = {
      visiteur: {
        nom: 'Formulaire Visiteur',
        route: '/visiter',
        api: '/api/visitor',
        emailAdmin: emailAdmin,
        emailConfirmation: emailConfirmation,
        googleSheet: sheetVisiteurs,
        sheetInfo: 'Onglet "Visiteurs" du tableur principal (SHEET_ID)',
      },
      exposant: {
        nom: 'Pré-inscription Exposant',
        route: '/exposer',
        api: '/api/exhibitor',
        emailAdmin: emailAdmin,
        emailConfirmation: emailConfirmation,
        googleSheet: sheetExposants,
        sheetInfo: 'Onglet "Exposants" du tableur principal (SHEET_ID)',
      },
      contact: {
        nom: 'Formulaire Contact',
        route: '/contact',
        api: '/api/contact',
        emailAdmin: emailAdmin,
        emailConfirmation: emailConfirmation,
        googleSheet: sheetContact,
        sheetInfo: 'Onglet "Contact" du tableur principal (SHEET_ID)',
      },
      inscription: {
        nom: 'Bulletin d\'inscription Exposant',
        route: '/inscription-exposant',
        api: '/api/inscription',
        emailAdmin: emailAdmin,
        emailConfirmation: emailConfirmation,
        googleSheet: sheetInscription,
        sheetInfo: 'Tableur séparé Inscriptions (INSCRIPTION_SHEET_ID)',
      },
    }

    const allOk =
      emailAdmin.ok &&
      emailConfirmation.ok &&
      sheetVisiteurs.ok &&
      sheetExposants.ok &&
      sheetContact.ok &&
      sheetInscription.ok

    return NextResponse.json({
      timestamp,
      status: allOk ? 'ok' : 'degraded',
      env,
      from_email: FROM_EMAIL,
      admin_email: ADMIN_EMAIL,
      formulaires,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors du diagnostic: ' + String(error) },
      { status: 500 }
    )
  }
}
