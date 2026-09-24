/**
 * Consentement cookies (CNIL).
 *
 * Tant que l'utilisateur n'a pas accepté :
 *  - Google Analytics tourne en « consent mode » refusé (aucun cookie, aucun identifiant) ;
 *  - le pixel Meta n'est même pas chargé.
 *
 * Le choix est conservé 6 mois, puis la bannière se represente.
 */

export const CONSENT_KEY = 'cookie-consent'
export const CONSENT_EVENT = 'cookie-consent-change'
const CONSENT_MAX_AGE_DAYS = 180

export type ConsentChoice = 'granted' | 'denied'

type StoredConsent = {
  choice: ConsentChoice
  timestamp: string
}

/** Choix en cours, ou null si l'utilisateur n'a jamais répondu (ou si son choix a expiré). */
export function readConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const stored = JSON.parse(raw) as StoredConsent
    if (stored.choice !== 'granted' && stored.choice !== 'denied') return null

    const ageMs = Date.now() - new Date(stored.timestamp).getTime()
    if (!Number.isFinite(ageMs) || ageMs > CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000) return null

    return stored.choice
  } catch {
    return null
  }
}

/** Enregistre le choix et prévient la page (Analytics écoute cet évènement). */
export function writeConsent(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return
  try {
    const stored: StoredConsent = { choice, timestamp: new Date().toISOString() }
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(stored))
  } catch {
    // navigation privée / stockage bloqué : on applique quand même le choix pour la session
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }))
}

/** Efface le choix pour reproposer la bannière (lien « Gérer mes cookies »). */
export function resetConsent(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(CONSENT_KEY)
  } catch {
    // ignoré
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }))
}
