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

  // La bannière est fixée en bas de l'écran : sans cette marge, elle recouvre le
  // bouton d'envoi des formulaires sur mobile. On libère la hauteur qu'elle occupe
  // réellement, et on en garde un peu plus pour que le bouton ne colle pas dessous.
  useEffect(() => {
    if (!isVisible) return

    const applyPadding = () => {
      const height = document.getElementById('consent-banner')?.offsetHeight ?? 0
      document.body.style.paddingBottom = height ? `${height + 24}px` : ''
    }

    applyPadding()
    window.addEventListener('resize', applyPadding)
    return () => {
      window.removeEventListener('resize', applyPadding)
      document.body.style.paddingBottom = ''
    }
  }, [isVisible])

  const choose = useCallback((choice: 'granted' | 'denied') => {
    writeConsent(choice)
    setIsVisible(false)
  }, [])

  if (!isVisible) return null

  return (
    <div
      id="consent-banner"
      className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4"
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-description"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl border border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
        <p id="consent-description" className="text-gray-700 text-xs sm:text-sm leading-snug mb-3">
          Nous utilisons des cookies de mesure d&apos;audience et de publicité, uniquement
          avec votre accord.{' '}
          <Link href="/politique-de-confidentialite" className="text-primary underline whitespace-nowrap">
            En savoir plus
          </Link>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => choose('granted')}
            className="flex-1 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            Accepter
          </button>
          <button
            type="button"
            onClick={() => choose('denied')}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-primary text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  )
}
