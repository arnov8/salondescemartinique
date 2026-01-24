import { google } from 'googleapis'

export const SHEET_TABS = {
  CONTACT: 'Contact',
  EXPOSANTS: 'Exposants',
  VISITEURS: 'Visiteurs',
} as const

type SheetTab = (typeof SHEET_TABS)[keyof typeof SHEET_TABS]

async function getAuthClient() {
  if (!process.env.GOOGLE_CREDENTIALS) {
    throw new Error('GOOGLE_CREDENTIALS non configuré')
  }
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS)
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return auth
}

export async function appendToSheet(
  sheetTab: SheetTab,
  values: (string | number | null | undefined)[]
) {
  if (!process.env.SHEET_ID) {
    console.warn('SHEET_ID non configuré - écriture Google Sheets ignorée')
    return null
  }

  try {
    const auth = await getAuthClient()
    const sheets = google.sheets({ version: 'v4', auth })

    const timestamp = new Date().toLocaleString('fr-FR', {
      timeZone: 'America/Martinique',
      dateStyle: 'short',
      timeStyle: 'short',
    })

    const rowValues = [timestamp, ...values.map((v) => v ?? '')]

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: `${sheetTab}!A:Z`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowValues],
      },
    })

    console.log(`[Google Sheets] Données ajoutées dans "${sheetTab}"`)
    return response.data
  } catch (error) {
    console.error(`[Google Sheets] Erreur écriture (${sheetTab}):`, error)
    return null
  }
}
