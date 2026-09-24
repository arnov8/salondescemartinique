'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { CONSENT_EVENT, readConsent, writeConsent } from '@/lib/consent'

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (readConsent() === null) {
      const timer = setTimeout(() => setIsVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  // Le lien « Gérer mes cookies » du footer efface le choix : la bannière revient.
  useEffect(() => {
    const onChange = (event: Event) => {
      if ((event as CustomEvent).detail === null) setIsVisible(true)
    }
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [])

  const choose = useCallback((choice: 'granted' | 'denied') => {
    writeConsent(choice)
    setIsVisible(false)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-description"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 md:p-8">
        <h2 id="consent-title" className="text-base sm:text-lg font-bold text-primary mb-2">
          Nous respectons votre vie privée
        </h2>
        <p id="consent-description" className="text-gray-600 text-sm mb-5">
          Ce site dépose des cookies de mesure d&apos;audience (Google Analytics) et de
          publicité (Meta&nbsp;/&nbsp;Facebook) afin de comprendre la fréquentation du salon
          et de mesurer nos campagnes. Ils ne sont déposés qu&apos;avec votre accord.{' '}
          <Link href="/politique-de-confidentialite" className="text-primary underline hover:text-accent">
            En savoir plus
          </Link>
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => choose('granted')}
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            Accepter
          </button>
          <button
            type="button"
            onClick={() => choose('denied')}
            className="px-6 py-3 bg-gray-100 text-primary font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  )
}
