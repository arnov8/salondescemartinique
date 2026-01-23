'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react'

const exhibitorSchema = z.object({
  companyName: z.string().min(2, 'Nom de l\'entreprise requis'),
  sector: z.string().min(1, 'Secteur d\'activité requis'),
  contactName: z.string().min(2, 'Nom du contact requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  address: z.string().min(5, 'Adresse requise'),
  message: z.string().optional(),
  // Honeypot field
  fax: z.string().max(0, 'Ce champ doit rester vide').optional(),
})

type ExhibitorFormData = z.infer<typeof exhibitorSchema>

const sectors = [
  'Agences de voyage',
  'Chèques cadeaux & Billetterie',
  'Animation & Spectacles',
  'Hôtellerie & Hébergements',
  'Loisirs & Culture',
  'Conseil juridique & Gestion',
  'Formation',
  'Assurance & Mutuelle',
  'Vins & Traiteurs',
  'Bien-être & Spa',
  'Jouets & Enfants',
  'Banque & Services financiers',
  'Bureautique & Imprimerie',
  'Objets publicitaires',
  'Autre',
]

export default function ExhibitorForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExhibitorFormData>({
    resolver: zodResolver(exhibitorSchema),
  })

  const onSubmit = async (data: ExhibitorFormData) => {
    // Check honeypot
    if (data.fax) {
      setIsSubmitted(true)
      return
    }

    setIsLoading(true)
    setServerError(null)

    try {
      const response = await fetch('/api/exhibitor', {
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
        <h3 className="text-2xl font-bold text-primary mb-4">Demande envoyée !</h3>
        <p className="text-gray-600 mb-6">
          Merci pour votre intérêt. Notre équipe commerciale vous contactera
          très prochainement pour discuter de votre participation.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="btn-outline-primary"
        >
          Nouvelle demande
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
        <label htmlFor="fax">Fax (ne pas remplir)</label>
        <input type="text" id="fax" {...register('fax')} tabIndex={-1} autoComplete="off" />
      </div>

      {/* Nom entreprise */}
      <div>
        <label htmlFor="companyName" className="label-field">
          Nom de l&apos;entreprise <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(requis)</span>
        </label>
        <input
          type="text"
          id="companyName"
          {...register('companyName')}
          className="input-field"
          placeholder="Ma Société SARL"
          aria-required="true"
          aria-invalid={errors.companyName ? 'true' : 'false'}
          aria-describedby={errors.companyName ? 'companyName-error' : undefined}
        />
        {errors.companyName && (
          <p id="companyName-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.companyName.message}
          </p>
        )}
      </div>

      {/* Secteur */}
      <div>
        <label htmlFor="sector" className="label-field">
          Secteur d&apos;activité <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(requis)</span>
        </label>
        <select
          id="sector"
          {...register('sector')}
          className="input-field"
          aria-required="true"
          aria-invalid={errors.sector ? 'true' : 'false'}
          aria-describedby={errors.sector ? 'sector-error' : undefined}
        >
          <option value="">Sélectionner un secteur</option>
          {sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
        {errors.sector && (
          <p id="sector-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.sector.message}
          </p>
        )}
      </div>

      {/* Nom contact */}
      <div>
        <label htmlFor="contactName" className="label-field">
          Nom &amp; Prénom du contact <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(requis)</span>
        </label>
        <input
          type="text"
          id="contactName"
          {...register('contactName')}
          className="input-field"
          placeholder="Jean Dupont"
          aria-required="true"
          aria-invalid={errors.contactName ? 'true' : 'false'}
          aria-describedby={errors.contactName ? 'contactName-error' : undefined}
        />
        {errors.contactName && (
          <p id="contactName-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.contactName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="exhibitor-email" className="label-field">
          Email <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(requis)</span>
        </label>
        <input
          type="email"
          id="exhibitor-email"
          {...register('email')}
          className="input-field"
          placeholder="contact@masociete.com"
          aria-required="true"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'exhibitor-email-error' : undefined}
        />
        {errors.email && (
          <p id="exhibitor-email-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Téléphone */}
      <div>
        <label htmlFor="exhibitor-phone" className="label-field">
          Téléphone <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(requis)</span>
        </label>
        <input
          type="tel"
          id="exhibitor-phone"
          {...register('phone')}
          className="input-field"
          placeholder="0596 XX XX XX"
          aria-required="true"
          aria-invalid={errors.phone ? 'true' : 'false'}
          aria-describedby={errors.phone ? 'exhibitor-phone-error' : undefined}
        />
        {errors.phone && (
          <p id="exhibitor-phone-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Adresse */}
      <div>
        <label htmlFor="address" className="label-field">
          Adresse de l&apos;entreprise <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(requis)</span>
        </label>
        <input
          type="text"
          id="address"
          {...register('address')}
          className="input-field"
          placeholder="123 Rue Example, Fort-de-France"
          aria-required="true"
          aria-invalid={errors.address ? 'true' : 'false'}
          aria-describedby={errors.address ? 'address-error' : undefined}
        />
        {errors.address && (
          <p id="address-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.address.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="exhibitor-message" className="label-field">Message (optionnel)</label>
        <textarea
          id="exhibitor-message"
          {...register('message')}
          className="input-field min-h-[120px] resize-none"
          placeholder="Décrivez brièvement vos produits/services et vos besoins..."
        />
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
            <span>Envoyer ma demande</span>
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Notre équipe vous recontactera sous 48h pour discuter de votre participation.
      </p>
    </form>
  )
}
