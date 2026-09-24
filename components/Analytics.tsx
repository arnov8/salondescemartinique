'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { CONSENT_EVENT, readConsent, type ConsentChoice } from '@/lib/consent'

const GA_MEASUREMENT_ID = 'G-XD9BL6ZMGP'
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

type Gtag = (...args: unknown[]) => void
type Fbq = ((...args: unknown[]) => void) & {
  queue?: unknown[]
  callMethod?: (...args: unknown[]) => void
  push?: unknown
  loaded?: boolean
  version?: string
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
    fbq?: Fbq
    _fbq?: Fbq
  }
}

/**
 * Consent mode Google : tout est refusé par défaut. Le script gtag est chargé
 * mais ne dépose aucun cookie tant que l'utilisateur n'a pas accepté.
 */
const GTAG_BOOTSTRAP = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
`

/** Charge fbevents.js à la demande — jamais avant le consentement. */
function loadMetaPixel(pixelId: string): void {
  if (window.fbq) return

  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args)
    else fbq.queue?.push(args)
  } as Fbq

  fbq.queue = []
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.push = fbq

  window.fbq = fbq
  window._fbq = fbq

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)

  fbq('init', pixelId)
  fbq('track', 'PageView')
}

function grantConsent(): void {
  window.gtag?.('consent', 'update', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
  })
  if (META_PIXEL_ID) loadMetaPixel(META_PIXEL_ID)
}

export default function Analytics() {
  useEffect(() => {
    if (readConsent() === 'granted') grantConsent()

    const onChange = (event: Event) => {
      const choice = (event as CustomEvent<ConsentChoice | null>).detail
      if (choice === 'granted') grantConsent()
    }

    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [])

  return (
    <>
      <Script id="gtag-consent-default" strategy="beforeInteractive">
        {GTAG_BOOTSTRAP}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
    </>
  )
}
