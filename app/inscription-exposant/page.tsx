import type { Metadata } from 'next'
import InscriptionForm from '@/components/forms/InscriptionForm'

export const metadata: Metadata = {
  title: 'Bulletin d\'inscription exposant - Salon des CSE & COS de Martinique 2026',
  robots: { index: false, follow: false },
}

export default function InscriptionExposantPage() {
  return (
    <div className="min-h-screen bg-gray-100 print:bg-white">
      {/* Header - hidden in print */}
      <div className="bg-primary text-white py-6 print:hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-accent font-bold text-sm mb-1">35ème édition</p>
          <h1 className="text-xl sm:text-2xl font-black">
            Salon des CSE &amp; COS de Martinique 2026
          </h1>
          <p className="text-white/70 text-sm mt-1">Jeudi 1er Octobre 2026 &middot; Madiana Palais des Congrès</p>
          <p className="text-white/50 text-xs mt-3">Bulletin d&apos;inscription exposant en ligne</p>
        </div>
      </div>

      {/* Form */}
      <div className="py-6 sm:py-10 px-4 print:py-0 print:px-0">
        <InscriptionForm />
      </div>

      {/* Footer - hidden in print */}
      <div className="bg-gray-200 py-4 text-center text-xs text-gray-500 print:hidden">
        <p>ANTILLES SALONS SASU - Centre Commercial de Bellevue, 97200 Fort-de-France</p>
        <p>Tél. : 05 96 61 21 21 - 06 96 26 30 96</p>
      </div>
    </div>
  )
}
