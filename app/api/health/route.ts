import { NextResponse } from 'next/server'
import { sendEmail, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/resend'
import { appendToSheet, SHEET_TABS } from '@/lib/google-sheets'

export const dynamic = 'force-dynamic'

export async function GET() {
  const results: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      ADMIN_EMAIL: !!process.env.ADMIN_EMAIL,
      SHEET_ID: !!process.env.SHEET_ID,
      INSCRIPTION_SHEET_ID: !!process.env.INSCRIPTION_SHEET_ID,
      GOOGLE_CREDENTIALS: !!process.env.GOOGLE_CREDENTIALS,
      FROM_EMAIL: !!process.env.FROM_EMAIL,
    },
    from_email: FROM_EMAIL,
    admin_email: ADMIN_EMAIL,
  }

  // Test Resend
  try {
    const emailResult = await sendEmail({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: '[HEALTH CHECK] Test connectivité Resend',
      html: `<p>Test automatique de connectivité Resend - ${new Date().toLocaleString('fr-FR', { timeZone: 'America/Martinique' })}</p>`,
    })
    results.resend = { ok: emailResult.success, id: emailResult.id, error: emailResult.error }
  } catch (error) {
    results.resend = { ok: false, error: String(error) }
  }

  // Test Google Sheets (read-only test via append with empty check)
  try {
    const sheetResult = await appendToSheet(SHEET_TABS.CONTACT, [
      '[HEALTH CHECK]',
      'test@health.check',
      '',
      'Test automatique',
      'Ce message peut être supprimé',
    ])
    results.googleSheets = { ok: !!sheetResult }
  } catch (error) {
    results.googleSheets = { ok: false, error: String(error) }
  }

  const allOk =
    (results.resend as { ok: boolean })?.ok &&
    (results.googleSheets as { ok: boolean })?.ok

  results.status = allOk ? 'ok' : 'degraded'

  return NextResponse.json(results, { status: allOk ? 200 : 503 })
}
