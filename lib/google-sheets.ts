import { google } from 'googleapis'

export const SHEET_TABS = {
  CONTACT: 'Contact',
  EXPOSANTS: 'Exposants',
  VISITEURS: 'Visiteurs',
  INSCRIPTIONS: 'Inscriptions',
} as const

type SheetTab = (typeof SHEET_TABS)[keyof typeof SHEET_TABS]

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
  const credentials = process.env.GOOGLE_CREDENTIALS?.trim()
  if (!credentials) {
    console.warn(`GOOGLE_CREDENTIALS non configuré - écriture ignorée`)
    return null
  }

  // Inscriptions use a separate sheet if INSCRIPTION_SHEET_ID is set
  let sheetId: string | undefined
  if (sheetTab === SHEET_TABS.INSCRIPTIONS) {
    sheetId = (process.env.INSCRIPTION_SHEET_ID || process.env.SHEET_ID)?.trim()
  } else {
    sheetId = process.env.SHEET_ID?.trim()
  }

  if (!sheetId) {
    console.warn(`SHEET_ID non configuré pour "${sheetTab}" - écriture ignorée`)
    return null
  }

  const parsedCreds = JSON.parse(credentials)
  console.log(`[Google Sheets] Writing to tab="${sheetTab}" sheet="${sheetId.slice(0, 12)}..." account="${parsedCreds.client_email}"`)

  const auth = await getAuthClient(credentials)
  const sheets = google.sheets({ version: 'v4', auth })

  const timestamp = new Date().toLocaleString('fr-FR', {
    timeZone: 'America/Martinique',
    dateStyle: 'short',
    timeStyle: 'short',
  })

  const rowValues = [timestamp, ...values.map((v) => v ?? '')]

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${sheetTab}!A:Z`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [rowValues],
    },
  })

  console.log(`[Google Sheets] OK - données ajoutées dans "${sheetTab}"`)
  return response.data
}
