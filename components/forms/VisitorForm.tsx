'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  fullName: z.string().min(2, 'Nom requis'),
  position: z.string().min(2, 'Fonction requise'),
  company: z.string().min(2, 'Entreprise requise'),
  cseName: z.string().min(2, 'Nom du CSE/COS requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Téléphone invalide'),
  participants: z.string().min(1, 'Sélectionnez le nombre'),
  website: z.string().max(0).optional(), // honeypot
})

type FormData = z.infer<typeof schema>

export default function VisitorForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    if (data.website) {
      setIsSubmitted(true)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setIsSubmitted(true)
        reset()
      } else {
        const result = await res.json()
        setError(result.error || 'Une erreur est survenue')
      }
    } catch {
      setError('Erreur de connexion')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12 px-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Inscription confirmée !</h3>
        <p className="text-gray-600 mb-6">Après vérification, vous recevrez une confirmation d&apos;inscription par email.</p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Nouvelle inscription
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Honeypot */}
      <input type="text" {...register('website')} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom & Prénom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('fullName')}
            className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
            placeholder="Jean Dupont"
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fonction <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('position')}
            className={`w-full px-4 py-3 rounded-lg border ${errors.position ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
            placeholder="Secrétaire CSE"
          />
          {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Entreprise <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('company')}
            className={`w-full px-4 py-3 rounded-lg border ${errors.company ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
            placeholder="Nom de l'entreprise"
          />
          {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CSE / COS <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('cseName')}
            className={`w-full px-4 py-3 rounded-lg border ${errors.cseName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
            placeholder="Nom du CSE"
          />
          {errors.cseName && <p className="text-red-500 text-xs mt-1">{errors.cseName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register('email')}
            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
            placeholder="email@exemple.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            {...register('phone')}
            className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
            placeholder="0696 XX XX XX"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de participants <span className="text-red-500">*</span>
        </label>
        <select
          {...register('participants')}
          className={`w-full px-4 py-3 rounded-lg border ${errors.participants ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white`}
        >
          <option value="">Sélectionnez</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n} participant{n > 1 ? 's' : ''}</option>
          ))}
        </select>
        {errors.participants && <p className="text-red-500 text-xs mt-1">{errors.participants.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Envoi...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            S'inscrire gratuitement
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Réservé aux membres de Comités uniquement.
      </p>
    </form>
  )
}
