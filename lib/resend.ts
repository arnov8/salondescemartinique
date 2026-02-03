import { Resend } from 'resend'

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export const FROM_EMAIL = 'Salon des CSE Martinique <noreply@salondescemartinique.com>'
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@salondescemartinique.com'
