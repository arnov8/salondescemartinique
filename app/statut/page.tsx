'use client'

import { useState, useRef } from 'react'

interface ServiceCheck {
  ok: boolean
  error?: string
  detail?: string
}

interface FormulaireStatus {
  nom: string
  route: string
  emailAdmin: ServiceCheck
  emailConfirmation: ServiceCheck
  googleSheet: ServiceCheck
}

interface StatusData {
  timestamp: string
  status: 'ok' | 'degraded'
  env: Record<string, boolean>
  from_email: string
  admin_email: string
  formulaires: Record<string, FormulaireStatus>
}

export default function StatutPage() {
  const [pin, setPin] = useState(['', '', '', ''])
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<StatusData | null>(null)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newPin = [...pin]
    newPin[index] = value.slice(-1)
    setPin(newPin)
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
    if (pasted.length === 4) {
      setPin(pasted.split(''))
      inputRefs.current[3]?.focus()
    }
  }

  const handleSubmit = async () => {
    const fullPin = pin.join('')
    if (fullPin.length !== 4) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/statut', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: fullPin }),
      })

      if (res.status === 401) {
        setError('Code PIN incorrect')
        setPin(['', '', '', ''])
        inputRefs.current[0]?.focus()
        setLoading(false)
        return
      }

      const result = await res.json()
      if (result.error) {
        setError(result.error)
      } else {
        setData(result)
        setAuthenticated(true)
      }
    } catch {
      setError('Erreur de connexion')
    }
    setLoading(false)
  }

  const refresh = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/statut', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pin.join('') }),
      })
      const result = await res.json()
      if (!result.error) setData(result)
    } catch { /* ignore */ }
    setLoading(false)
  }

  // PIN screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Statut du site</h1>
          <p className="text-gray-500 text-sm mb-8">Entrez le code PIN pour accéder au diagnostic</p>

          <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
            {pin.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900"
                autoFocus={i === 0}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 animate-fade-in">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || pin.join('').length !== 4}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Vérification...
              </span>
            ) : 'Accéder'}
          </button>
        </div>
      </div>
    )
  }

  // Status dashboard
  if (!data) return null

  const globalOk = data.status === 'ok'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`${globalOk ? 'bg-gradient-to-r from-emerald-600 to-emerald-500' : 'bg-gradient-to-r from-red-600 to-red-500'} text-white`}>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Salon des CSE Martinique</h1>
              <p className="text-white/80 text-sm mt-1">Diagnostic des services</p>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${globalOk ? 'bg-white/20' : 'bg-white/20'}`}>
                <span className={`w-3 h-3 rounded-full ${globalOk ? 'bg-green-300 animate-pulse' : 'bg-red-300 animate-pulse'}`} />
                {globalOk ? 'Tous les services fonctionnent' : 'Services dégradés'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Timestamp + refresh */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Dernier test : {data.timestamp}</span>
          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-1.5 text-primary hover:text-primary-dark font-medium transition-colors disabled:opacity-50"
          >
            <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Relancer le test
          </button>
        </div>

        {/* Per-form status cards */}
        {Object.entries(data.formulaires).map(([key, form]) => {
          const allOk = form.emailAdmin.ok && form.emailConfirmation.ok && form.googleSheet.ok
          return (
            <div key={key} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Card header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <FormIcon type={key} />
                  <div>
                    <h2 className="font-semibold text-gray-900">{form.nom}</h2>
                    <p className="text-xs text-gray-400">{form.route}</p>
                  </div>
                </div>
                <StatusBadge ok={allOk} />
              </div>

              {/* Service rows */}
              <div className="divide-y divide-gray-50">
                <ServiceRow
                  label="Email notification admin"
                  description={`Envoie un récap de la soumission vers ${data.admin_email}`}
                  check={form.emailAdmin}
                />
                <ServiceRow
                  label="Email de confirmation visiteur"
                  description="Envoie un accusé de réception au visiteur/exposant"
                  check={form.emailConfirmation}
                />
                <ServiceRow
                  label="Google Sheets"
                  description={key === 'inscription' ? 'Enregistre dans le tableur Inscriptions' : 'Enregistre dans le tableur principal'}
                  check={form.googleSheet}
                />
              </div>
            </div>
          )
        })}

        {/* Environment variables */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Variables d&apos;environnement</h2>
          </div>
          <div className="px-6 py-4 grid grid-cols-2 gap-3">
            {Object.entries(data.env).map(([key, configured]) => (
              <div key={key} className="flex items-center gap-2 text-sm">
                {configured ? (
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                <span className={`font-mono text-xs ${configured ? 'text-gray-700' : 'text-red-600'}`}>{key}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Email config info */}
        <div className="text-center text-xs text-gray-400 pb-8 space-y-1">
          <p>Expéditeur : {data.from_email}</p>
          <p>Destinataire admin : {data.admin_email}</p>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ ok }: { ok: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
      ok ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
    }`}>
      <span className={`w-2 h-2 rounded-full ${ok ? 'bg-emerald-500' : 'bg-red-500'}`} />
      {ok ? 'Opérationnel' : 'Problème'}
    </span>
  )
}

function ServiceRow({ label, description, check }: { label: string; description: string; check: ServiceCheck }) {
  return (
    <div className="flex items-center justify-between px-6 py-3.5">
      <div className="flex items-center gap-3">
        {check.ok ? (
          <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )}
        <div>
          <p className="text-sm font-medium text-gray-800">{label}</p>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </div>
      {!check.ok && check.error && (
        <span className="text-xs text-red-500 max-w-[200px] truncate" title={check.error}>
          {check.error}
        </span>
      )}
    </div>
  )
}

function FormIcon({ type }: { type: string }) {
  const iconClass = 'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0'

  switch (type) {
    case 'visiteur':
      return (
        <div className={`${iconClass} bg-blue-50 text-blue-600`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      )
    case 'exposant':
      return (
        <div className={`${iconClass} bg-amber-50 text-amber-600`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      )
    case 'contact':
      return (
        <div className={`${iconClass} bg-green-50 text-green-600`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      )
    case 'inscription':
      return (
        <div className={`${iconClass} bg-purple-50 text-purple-600`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      )
    default:
      return <div className={`${iconClass} bg-gray-50 text-gray-600`} />
  }
}
