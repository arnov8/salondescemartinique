import { CheckCircle, Users, TrendingUp, Handshake, Target } from 'lucide-react'
import ExhibitorForm from '@/components/forms/ExhibitorForm'

const benefits = [
  {
    icon: Users,
    title: '+700 visiteurs qualifiés',
    description: 'Rencontrez des décideurs CSE/COS en Martinique.',
  },
  {
    icon: TrendingUp,
    title: 'Visibilité maximale',
    description: 'Exposez vos produits devant un public ciblé et qualifié.',
  },
  {
    icon: Handshake,
    title: 'Contact privilégié',
    description: 'Uniquement des responsables et membres du bureau CE.',
  },
  {
    icon: Target,
    title: 'Leads qualifiés',
    description: 'Générez des contacts commerciaux à fort potentiel.',
  },
]

const included = [
  'Stand équipé (table, chaises, électricité)',
  'Badge exposant',
  'Visibilité sur le plan du salon',
  'Listing dans le catalogue exposants',
  'Participation à la Tombola des CE',
  'Communication sur les réseaux sociaux',
]

const targetAudience = [
  'Secrétaires de CSE',
  'Trésoriers de CSE',
  'Présidents de CSE',
  'Responsables COS',
  'Membres du bureau CE',
  'Élus du personnel',
]

export const metadata = {
  title: 'Devenir Exposant | Salon des CSE & COS de Martinique 2025',
  description: 'Réservez votre stand au Salon des CSE & COS de Martinique 2025 et présentez vos produits aux décideurs des comités d\'entreprise.',
}

export default function ExposerPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="gradient-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-accent text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
              Réservez votre stand
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Devenir Exposant
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Rejoignez les +60 exposants et présentez vos produits et services
              aux décideurs CSE &amp; COS de Martinique.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Pourquoi exposer ?</h2>
          <p className="section-subtitle text-center">
            Le Salon des CSE &amp; COS est l&apos;occasion idéale pour développer
            votre activité auprès des comités d&apos;entreprise martiniquais.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="card text-center">
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Ce qui est inclus</h2>
              <p className="text-gray-600 mb-8">
                Chaque stand comprend tout le nécessaire pour une participation
                réussie au salon.
              </p>
              <div className="space-y-4">
                {included.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card bg-gradient-to-br from-primary to-primary-dark text-white">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-10 h-10 text-accent" />
                <h3 className="text-2xl font-bold">Public cible</h3>
              </div>
              <p className="text-gray-200 mb-6">
                Le salon attire les décideurs et responsables des CSE &amp; COS :
              </p>
              <div className="grid grid-cols-2 gap-3">
                {targetAudience.map((audience, index) => (
                  <div key={index} className="bg-white/10 rounded-lg px-3 py-2 text-sm">
                    {audience}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Info */}
            <div>
              <h2 className="section-title">Pré-inscription exposant</h2>
              <p className="text-gray-600 mb-8">
                Remplissez le formulaire ci-contre pour recevoir toutes les informations
                sur les tarifs et les modalités de participation.
              </p>

              <div className="space-y-6">
                <div className="card border-l-4 border-accent">
                  <h3 className="font-bold text-primary mb-2">Processus simple</h3>
                  <ol className="text-gray-600 text-sm space-y-2">
                    <li>1. Remplissez le formulaire de pré-inscription</li>
                    <li>2. Notre équipe vous contacte sous 48h</li>
                    <li>3. Choisissez votre emplacement et formule</li>
                    <li>4. Validez votre participation</li>
                  </ol>
                </div>

                <div className="card border-l-4 border-primary">
                  <h3 className="font-bold text-primary mb-2">Contact direct</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Vous avez des questions ? Contactez notre équipe :
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Tél :</span>{' '}
                    <a href="tel:0596612121" className="text-primary hover:text-accent">05 96 61 21 21</a>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email :</span>{' '}
                    <a href="mailto:intersaloncaraibe@yahoo.fr" className="text-primary hover:text-accent">
                      intersaloncaraibe@yahoo.fr
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="card">
              <h3 className="text-xl font-bold text-primary mb-6">Formulaire de pré-inscription</h3>
              <ExhibitorForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
