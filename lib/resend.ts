import { Resend } from 'resend'

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export const FROM_EMAIL = process.env.FROM_EMAIL
  ? `Salon des CSE Martinique <${process.env.FROM_EMAIL}>`
  : 'Salon des CSE Martinique <noreply@salondescemartinique.com>'
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@salondescemartinique.com'

/**
 * Send an email via Resend with proper error checking and logging
 */
export async function sendEmail(params: {
  from: string
  to: string
  subject: string
  html: string
  replyTo?: string
  attachments?: { filename: string; content: Buffer }[]
}): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!resend) {
    console.error('[Resend] RESEND_API_KEY non configuré - email non envoyé')
    return { success: false, error: 'RESEND_API_KEY non configuré' }
  }

  try {
    const { data, error } = await resend.emails.send(params)

    if (error) {
      console.error(`[Resend] Erreur envoi à ${params.to}:`, JSON.stringify(error))
      return { success: false, error: error.message || JSON.stringify(error) }
    }

    console.log(`[Resend] OK - email envoyé à ${params.to} (id: ${data?.id})`)
    return { success: true, id: data?.id }
  } catch (err) {
    console.error(`[Resend] Exception envoi à ${params.to}:`, err)
    return { success: false, error: String(err) }
  }
}
