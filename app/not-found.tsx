'use client'

import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* 404 Number */}
        <div className="relative mb-8">
          <span className="text-[150px] md:text-[200px] font-bold text-primary/10 leading-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-20 h-20 md:w-24 md:h-24 text-primary" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Page introuvable
        </h1>
        <p className="text-gray-600 mb-8">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
          Peut-être cherchez-vous l&apos;une de ces pages ?
        </p>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link
            href="/visiter"
            className="card hover:border-accent border-2 border-transparent transition-colors"
          >
            <p className="font-bold text-primary">Visiter</p>
            <p className="text-sm text-gray-500">Inscription gratuite</p>
          </Link>
          <Link
            href="/exposer"
            className="card hover:border-accent border-2 border-transparent transition-colors"
          >
            <p className="font-bold text-primary">Exposer</p>
            <p className="text-sm text-gray-500">Devenir exposant</p>
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary inline-flex items-center justify-center gap-2">
            <Home className="w-5 h-5" />
            Retour à l&apos;accueil
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-outline-primary inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Page précédente
          </button>
        </div>
      </div>
    </div>
  )
}
