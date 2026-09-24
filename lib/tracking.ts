/**
 * Évènements de conversion envoyés au pixel Meta.
 *
 * `SITE_ID` identifie le salon dans le pixel : il permet de découper les audiences
 * par salon sans jamais mélanger les publics (un exposant martiniquais n'est pas
 * une cible guadeloupéenne, et inversement).
 *
 * Les évènements ne partent que si l'utilisateur a accepté les cookies :
 * sans consentement, `window.fbq` n'existe pas.
 */

export const SITE_ID = 'scse-mq'

type MetaEvent = 'CompleteRegistration' | 'Lead' | 'Purchase' | 'Contact'

type TrackParams = {
  /** 'visiteur' (élu CSE/COS) ou 'exposant' (prestataire) */
  content_category?: 'visiteur' | 'exposant'
  /** Montant réel, uniquement pour Purchase */
  value?: number
  currency?: 'EUR'
}

export function trackConversion(event: MetaEvent, params: TrackParams = {}): void {
  if (typeof window === 'undefined') return

  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq
  if (typeof fbq !== 'function') return

  try {
    fbq('track', event, { content_name: SITE_ID, ...params })
  } catch {
    // le suivi ne doit jamais casser un envoi de formulaire
  }
}
