'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react'

const visitorSchema = z.object({
  fullName: z.string().min(2, 'Nom requis (minimum 2 caractères)'),
  position: z.string().min(2, 'Fonction requise'),
  company: z.string().min(2, 'Entreprise requise'),
  cseName: z.string().min(2, 'Nom du CSE/COS requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  // Honeypot field - should remain empty
  website: z.string().max(0, 'Ce champ doit rester vide').optional(),
})

type VisitorFormData = z.infer<typeof visitorSchema>

export default function VisitorForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VisitorFormData>({
    resolver: zodResolver(visitorSchema),
  })

  const onSubmit = async (data: VisitorFormData) => {
    // Check honeypot
    if (data.website) {
      // Bot detected, silently reject
      setIsSubmitted(true)
      return
    }

    setIsLoading(true)
    setServerError(null)

    try {
      const response = await fetch('/api/visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        reset()
      } else {
        setServerError(result.error || 'Une erreur est survenue. Veuillez réessayer.')
      }
    } catch {
      setServerError('Erreur de connexion. Vérifiez votre connexion internet.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12" role="status" aria-live="polite">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-bold text-primary mb-4">Inscription enregistrée !</h3>
        <p className="text-gray-600 mb-6">
          Merci pour votre inscription. Vous recevrez bientôt un email de confirmation
          avec votre badge visiteur.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="btn-outline-primary"
        >
          Nouvelle inscription
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Server Error Alert */}
      {serverError && (
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p>{serverError}</p>
        </div>
      )}

      {/* Honeypot - hidden from users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Site web (ne pas remplir)</label>
        <input
          type="text"
          id="website"
          {...register('website')}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Nom & Prénom */}
      <div>
        <label htmlFor="fullName" className="label-field">
          Nom &amp; Prénom <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(requis)</span>
        </label>
        <input
          type="text"
          id="fullName"
          {...register('fullName')}
          className="input-field"
          placeholder="Jean Dupont"
          aria-required="true"
          aria-invalid={errors.fullName ? 'true' : 'false'}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
        />
        {errors.fullName && (
          <p id="fullName-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Fonction */}
      <div>
        <label htmlFor="position" className="label-field">
          Fonction / Poste <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(requis)</span>
        </label>
        <input
          type="text"
          id="position"
          {...register('position')}
          className="input-field"
          placeholder="Secrétaire CSE, Trésorier, etc."
          aria-required="true"
          aria-invalid={errors.position ? 'true' : 'false'}
          aria-describedby={errors.position ? 'position-error' : undefined}
        />
        {errors.position && (
          <p id="position-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.position.message}
          </p>
        )}
      </div>

      {/* Entreprise */}
      <div>
        <label htmlFor="company" className="label-field">
          Entreprise / Organisation <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(requis)</span>
        </label>
        <input
          type="text"
          id="company"
          {...register('company')}
          className="input-field"
          placeholder="Nom de votre entreprise"
          aria-required="true"
          aria-invalid={errors.company ? 'true' : 'false'}
          aria-describedby={errors.company ? 'company-error' : undefined}
        />
        {errors.company && (
          <p id="company-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.company.message}
          </p>
        )}
      </div>

      {/* Nom du CSE/COS */}
      <div>
        <label htmlFor="cseName" className="label-field">
          Nom du CSE / COS <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(requis)</span>
        </label>
        <input
          type="text"
          id="cseName"
          {...register('cseName')}
          className="input-field"
          placeholder="CSE de votre entreprise"
          aria-required="true"
          aria-invalid={errors.cseName ? 'true' : 'false'}
          aria-describedby={errors.cseName ? 'cseName-error' : undefined}
        />
        {errors.cseName && (
          <p id="cseName-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.cseName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="label-field">
          Email <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(requis)</span>
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className="input-field"
          placeholder="jean.dupont@entreprise.com"
          aria-required="true"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Téléphone */}
      <div>
        <label htmlFor="phone" className="label-field">
          Téléphone <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(requis)</span>
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone')}
          className="input-field"
          placeholder="0696 XX XX XX"
          aria-required="true"
          aria-invalid={errors.phone ? 'true' : 'false'}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-accent w-full flex items-center justify-center gap-2"
        aria-busy={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            <span>Envoi en cours...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" aria-hidden="true" />
            <span>S&apos;inscrire gratuitement</span>
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Entrée réservée aux membres de CSE et COS uniquement.
        Badge visiteur envoyé par email après validation.
      </p>
    </form>
  )
}
