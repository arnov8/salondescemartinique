'use client'

import { resetConsent } from '@/lib/consent'

/** Rouvre la bannière de consentement (obligation CNIL : le choix doit être révocable). */
export default function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={resetConsent}
      className="text-gray-400 hover:text-accent transition-colors text-sm py-1"
    >
      Gérer mes cookies
    </button>
  )
}
