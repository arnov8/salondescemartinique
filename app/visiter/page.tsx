import { Calendar, MapPin, Clock, CheckCircle, Users, Gift, Briefcase, Ticket, Car, UtensilsCrossed, FileCheck } from 'lucide-react'
import VisitorForm from '@/components/forms/VisitorForm'

const benefits = [
  {
    icon: Users,
    title: 'Rencontrez les exposants',
    description: 'Plus de 60 prestataires et fournisseurs pour répondre à tous les besoins de votre CSE/COS.',
  },
  {
    icon: Briefcase,
    title: 'Conférence CSE/COS',
    description: 'Assistez à une conférence exclusive animée par un expert en droit du travail.',
  },
  {
    icon: Gift,
    title: 'Tombola des CE',
    description: 'Participez au tirage au sort et tentez de remporter de nombreux cadeaux.',
  },
]

const infoPratiques = [
  { icon: Calendar, label: 'Date', value: 'Jeudi 2 Octobre 2025' },
  { icon: Clock, label: 'Horaires', value: '8h00 - 16h00' },
  { icon: MapPin, label: 'Lieu', value: 'Palais des Congrès, Schœlcher' },
]

const publicCible = [
  'Secrétaires de CSE',
  'Trésoriers de CSE',
  'Présidents de CSE',
  'Membres du bureau CE',
  'Responsables COS',
  'Élus du personnel',
]

const pratiques = [
  { icon: Car, text: 'Parking gratuit sur place' },
  { icon: Ticket, text: 'Badge visiteur remis à l\'entrée' },
  { icon: FileCheck, text: 'Plan du salon disponible' },
  { icon: UtensilsCrossed, text: 'Restauration sur place' },
]

export const metadata = {
  title: 'Visiter le Salon | Salon des CSE & COS de Martinique 2025',
  description: 'Inscrivez-vous gratuitement pour visiter le Salon des CSE & COS de Martinique 2025. Réservé aux membres de Comités Sociaux et Économiques.',
}

export default function VisiterPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="gradient-primary py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
            <span className="badge mb-4 sm:mb-6">
              Entrée Gratuite
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Visiter le Salon
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8">
              Découvrez en une journée les meilleures solutions pour votre
              Comité Social et Économique ou Comité d&apos;Œuvres Sociales.
            </p>

            {/* Info Cards - Horizontal scroll on mobile */}
            <div className="flex flex-col xs:flex-row flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
              {infoPratiques.map((info, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl flex-1 xs:flex-initial min-w-0"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-300">{info.label}</p>
                    <p className="font-semibold text-white text-sm truncate">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Pourquoi visiter ?</h2>
          <p className="section-subtitle text-center">
            Le Salon des CSE &amp; COS vous offre une opportunité unique de découvrir
            des solutions adaptées à vos missions.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="card text-center !p-5 sm:!p-6 lg:!p-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <benefit.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-primary mb-2 sm:mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Public & Form Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Public Cible */}
            <div className="order-2 lg:order-1">
              <h2 className="section-title text-center lg:text-left">Qui peut visiter ?</h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-center lg:text-left text-sm sm:text-base">
                L&apos;accès au salon est <strong>exclusivement réservé</strong> aux membres
                de Comités Sociaux et Économiques (CSE) et Comités d&apos;Œuvres Sociales (COS).
                L&apos;inscription est gratuite mais obligatoire.
              </p>

              {/* Public cible grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
                {publicCible.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white rounded-xl border border-gray-100">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {/* Infos pratiques */}
              <div className="p-4 sm:p-5 lg:p-6 bg-white rounded-xl border border-gray-100 shadow-sm mb-4 sm:mb-6">
                <h3 className="font-bold text-primary mb-3 sm:mb-4 text-sm sm:text-base">Informations pratiques</h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {pratiques.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tombola */}
              <div className="p-4 sm:p-5 lg:p-6 bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl border border-accent/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1 text-sm sm:text-base">Tombola des CE</h3>
                    <p className="text-sm text-gray-600">
                      Tous les visiteurs inscrits participent automatiquement au tirage
                      et peuvent remporter de nombreux cadeaux !
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="order-1 lg:order-2">
              <div className="card lg:sticky lg:top-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary flex items-center justify-center">
                    <Ticket className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">Inscription visiteur</h2>
                    <p className="text-gray-500 text-xs sm:text-sm">Gratuite et obligatoire</p>
                  </div>
                </div>
                <VisitorForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
