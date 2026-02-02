'use client'

import { useEffect, useRef, useCallback } from 'react'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

interface TurnstileProps {
  onVerify: (token: string) => void
  onError?: () => void
  onExpire?: () => void
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          callback: (token: string) => void
          'error-callback'?: () => void
          'expired-callback'?: () => void
          theme?: 'light' | 'dark' | 'auto'
          size?: 'normal' | 'compact' | 'invisible'
        }
      ) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
    onTurnstileLoad?: () => void
  }
}

export default function Turnstile({ onVerify, onError, onExpire }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || !TURNSTILE_SITE_KEY) return
    if (widgetIdRef.current) return // Already rendered

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: onVerify,
      'error-callback': onError,
      'expired-callback': onExpire,
      theme: 'light',
      size: 'normal',
    })
  }, [onVerify, onError, onExpire])

  useEffect(() => {
    // If Turnstile is already loaded, render immediately
    if (window.turnstile) {
      renderWidget()
      return
    }

    // Set up callback for when script loads
    window.onTurnstileLoad = renderWidget

    // Check if script already exists
    const existingScript = document.querySelector(
      'script[src*="challenges.cloudflare.com/turnstile"]'
    )

    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad'
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [renderWidget])

  if (!TURNSTILE_SITE_KEY) {
    return null
  }

  return <div ref={containerRef} className="flex justify-center my-4" />
}

/**
 * Hidden honeypot field component
 */
interface HoneypotFieldProps {
  name: string
  register: (name: string) => object
}

export function HoneypotField({ name, register }: HoneypotFieldProps) {
  return (
    <div className="hidden" aria-hidden="true">
      <label htmlFor={`hp-${name}`}>Ne pas remplir ce champ</label>
      <input
        type="text"
        id={`hp-${name}`}
        {...register(name)}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  )
}
