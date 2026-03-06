import { google } from 'googleapis'

export const SHEET_TABS = {
  CONTACT: 'Contact',
  EXPOSANTS: 'Exposants',
  VISITEURS: 'Visiteurs',
  INSCRIPTIONS: '2026',
} as const

type SheetTab = (typeof SHEET_TABS)[keyof typeof SHEET_TABS]

interface SheetConfig {
  sheetId: string
  credentials: string
}

function getSheetConfig(sheetTab: SheetTab): SheetConfig | null {
  // Inscriptions use a dedicated Google Sheet
  if (sheetTab === SHEET_TABS.INSCRIPTIONS) {
    const sheetId = process.env.INSCRIPTION_SHEET_ID
    const credentials = process.env.INSCRIPTION_GOOGLE_CREDENTIALS
    if (sheetId && credentials) {
      return { sheetId, credentials }
    }
  }
  // Default config
  const sheetId = process.env.SHEET_ID
  const credentials = process.env.GOOGLE_CREDENTIALS
  if (!sheetId || !credentials) return null
  return { sheetId, credentials }
}

async function getAuthClient(credentialsJson: string) {
  const credentials = JSON.parse(credentialsJson)
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
  const config = getSheetConfig(sheetTab)
  if (!config) {
    console.warn(`Sheet config non configuré pour "${sheetTab}" - écriture ignorée`)
    return null
  }

  try {
    const auth = await getAuthClient(config.credentials)
    const sheets = google.sheets({ version: 'v4', auth })

    const timestamp = new Date().toLocaleString('fr-FR', {
      timeZone: 'America/Martinique',
      dateStyle: 'short',
      timeStyle: 'short',
    })

    const rowValues = [timestamp, ...values.map((v) => v ?? '')]

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: config.sheetId,
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
