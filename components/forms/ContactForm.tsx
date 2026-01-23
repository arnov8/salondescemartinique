'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(2, 'Nom requis (minimum 2 caractères)'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Veuillez sélectionner un sujet'),
  message: z.string().min(10, 'Message requis (minimum 10 caractères)'),
  // Honeypot field
  company: z.string().max(0, 'Ce champ doit rester vide').optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

const subjects = [
  'Question générale',
  'Informations visiteur',
  'Informations exposant',
  'Partenariat / Sponsoring',
  'Presse / Média',
  'Autre',
]

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    // Check honeypot
    if (data.company) {
      setIsSubmitted(true)
      return
    }

    setIsLoading(true)
    setServerError(null)

    try {
      const response = await fetch('/api/contact', {
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
        <h3 className="text-2xl font-bold text-primary mb-4">Message envoyé !</h3>
        <p className="text-gray-600 mb-6">
          Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="btn-outline-primary"
        >
          Envoyer un autre message
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

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company-hp">Entreprise (ne pas remplir)</label>
        <input type="text" id="company-hp" {...register('company')} tabIndex={-1} autoComplete="off" />
      </div>

      {/* Nom */}
      <div>
        <label htmlFor="contact-name" className="label-field">
          Nom <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(requis)</span>
        </label>
        <input
          type="text"
          id="contact-name"
          {...register('name')}
          className="input-field"
          placeholder="Jean Dupont"
          aria-required="true"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
        />
        {errors.name && (
          <p id="contact-name-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="label-field">
          Email <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(requis)</span>
        </label>
        <input
          type="email"
          id="contact-email"
          {...register('email')}
          className="input-field"
          placeholder="jean.dupont@example.com"
          aria-required="true"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
        />
        {errors.email && (
          <p id="contact-email-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Téléphone */}
      <div>
        <label htmlFor="contact-phone" className="label-field">Téléphone</label>
        <input
          type="tel"
          id="contact-phone"
          {...register('phone')}
          className="input-field"
          placeholder="0696 XX XX XX"
        />
      </div>

      {/* Sujet */}
      <div>
        <label htmlFor="contact-subject" className="label-field">
          Sujet <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(requis)</span>
        </label>
        <select
          id="contact-subject"
          {...register('subject')}
          className="input-field"
          aria-required="true"
          aria-invalid={errors.subject ? 'true' : 'false'}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
        >
          <option value="">Sélectionner un sujet</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p id="contact-subject-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="label-field">
          Message <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(requis)</span>
        </label>
        <textarea
          id="contact-message"
          {...register('message')}
          className="input-field min-h-[150px] resize-none"
          placeholder="Votre message..."
          aria-required="true"
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full flex items-center justify-center gap-2"
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
            <span>Envoyer le message</span>
          </>
        )}
      </button>
    </form>
  )
}
