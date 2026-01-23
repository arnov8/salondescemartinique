import { Calendar, MapPin, Clock, CheckCircle, Users, Gift, Briefcase } from 'lucide-react'
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
  { icon: MapPin, label: 'Lieu', value: 'Palais des Congrès de Madiana, Schœlcher' },
]

const publicCible = [
  'Secrétaires de CSE',
  'Trésoriers de CSE',
  'Présidents de CSE',
  'Membres du bureau CE',
  'Responsables COS',
  'Élus du personnel',
]

export const metadata = {
  title: 'Visiter le Salon | Salon des CSE & COS de Martinique 2025',
  description: 'Inscrivez-vous gratuitement pour visiter le Salon des CSE & COS de Martinique 2025. Réservé aux membres de Comités Sociaux et Économiques.',
}

export default function VisiterPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="gradient-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-accent text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
              Entrée Gratuite
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Visiter le Salon
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Découvrez en une journée les meilleures solutions pour votre
              Comité Social et Économique ou Comité d&apos;Œuvres Sociales.
            </p>

            {/* Info Cards */}
            <div className="flex flex-wrap gap-4">
              {infoPratiques.map((info, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg"
                >
                  <info.icon className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-xs text-gray-300">{info.label}</p>
                    <p className="font-semibold text-white text-sm">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Pourquoi visiter ?</h2>
          <p className="section-subtitle text-center">
            Le Salon des CSE &amp; COS vous offre une opportunité unique de découvrir
            des solutions adaptées à vos missions.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="card text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Public & Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Public Cible */}
            <div>
              <h2 className="section-title">Qui peut visiter ?</h2>
              <p className="text-gray-600 mb-8">
                L&apos;accès au salon est <strong>exclusivement réservé</strong> aux membres
                de Comités Sociaux et Économiques (CSE) et Comités d&apos;Œuvres Sociales (COS).
                L&apos;inscription est gratuite mais obligatoire.
              </p>

              <div className="space-y-4">
                {publicCible.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/10">
                <h3 className="font-bold text-primary mb-2">Informations pratiques</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Parking gratuit sur place</li>
                  <li>• Badge visiteur remis à l&apos;entrée</li>
                  <li>• Plan du salon disponible</li>
                  <li>• Restauration sur place</li>
                </ul>
              </div>

              <div className="mt-6 p-6 bg-accent/10 rounded-xl border border-accent/20">
                <h3 className="font-bold text-accent-dark mb-2">Tombola des CE</h3>
                <p className="text-sm text-gray-600">
                  Tous les visiteurs inscrits participent automatiquement au tirage
                  de la Tombola des CE et peuvent remporter de nombreux cadeaux !
                </p>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              <div className="card">
                <h2 className="text-2xl font-bold text-primary mb-2">Inscription visiteur</h2>
                <p className="text-gray-600 mb-6">
                  Remplissez le formulaire ci-dessous pour vous inscrire gratuitement.
                </p>
                <VisitorForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
