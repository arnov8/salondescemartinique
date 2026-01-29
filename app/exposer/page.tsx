import { CheckCircle, Users, TrendingUp, Handshake, Target, Phone, Mail, Store } from 'lucide-react'
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
  'Participation à la Grande Tombola des Comités',
  'Salon mis en avant sur RCI, dans la presse et sur les réseaux sociaux',
]

const targetAudience = [
  'Secrétaires de CSE',
  'Trésoriers de CSE',
  'Présidents de CSE',
  'Responsables COS',
  'Membres du bureau CE',
  'Élus du personnel',
]

const steps = [
  { num: '1', text: 'Remplissez le formulaire de pré-inscription' },
  { num: '2', text: 'Notre équipe vous contacte sous 48h' },
  { num: '3', text: 'Choisissez votre emplacement et formule' },
  { num: '4', text: 'Validez votre participation' },
]

export const metadata = {
  title: 'Exposer | Salon des CSE & COS de Martinique 2025',
  description: 'Réservez votre stand au Salon des CSE & COS de Martinique 2025 et présentez vos produits aux décideurs des comités d\'entreprise.',
}

export default function ExposerPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="gradient-primary py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
            <span className="badge mb-4 sm:mb-6">
              Réservez votre stand
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Exposer
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-200">
              Rejoignez les +60 exposants et présentez vos produits et services
              aux décideurs CSE &amp; COS de Martinique.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Pourquoi exposer ?</h2>
          <p className="section-subtitle text-center">
            Le Salon des CSE &amp; COS est l&apos;occasion idéale pour développer
            votre activité auprès des comités d&apos;entreprise martiniquais.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-8 sm:mt-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="card text-center !p-4 sm:!p-5 lg:!p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                  <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-accent" />
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-primary mb-1 sm:mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm hidden sm:block">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="section-title text-center lg:text-left">Ce qui est inclus</h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-center lg:text-left text-sm sm:text-base">
                Chaque stand comprend tout le nécessaire pour une participation
                réussie au salon.
              </p>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                {included.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white rounded-xl border border-gray-100">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="card bg-gradient-to-br from-primary to-primary-dark text-white !p-5 sm:!p-6 lg:!p-8">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent flex items-center justify-center">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">Public cible</h3>
                </div>
                <p className="text-gray-200 mb-4 sm:mb-6 text-sm sm:text-base">
                  Le salon attire les décideurs et responsables des CSE &amp; COS :
                </p>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {targetAudience.map((audience, index) => (
                    <div key={index} className="bg-white/10 rounded-lg px-2.5 sm:px-3 py-2 text-xs sm:text-sm">
                      {audience}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Info */}
            <div className="order-2 lg:order-1">
              <h2 className="section-title text-center lg:text-left">Pré-inscription exposant</h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-center lg:text-left text-sm sm:text-base">
                Remplissez le formulaire pour recevoir toutes les informations
                sur les tarifs et les modalités de participation.
              </p>

              <div className="space-y-4 sm:space-y-6">
                {/* Process steps */}
                <div className="card !p-4 sm:!p-5 lg:!p-6 border-l-4 border-accent">
                  <h3 className="font-bold text-primary mb-3 sm:mb-4 text-sm sm:text-base">Processus simple</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-accent">
                          {step.num}
                        </div>
                        <span className="text-gray-600 text-sm">{step.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact direct */}
                <div className="card !p-4 sm:!p-5 lg:!p-6 border-l-4 border-primary">
                  <h3 className="font-bold text-primary mb-3 text-sm sm:text-base">Contact direct</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Vous avez des questions ? Contactez notre équipe :
                  </p>
                  <div className="space-y-2">
                    <a href="tel:0696263096" className="flex items-center gap-2 text-sm hover:text-accent transition-colors">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>06 96 26 30 96</span>
                    </a>
                    <a href="tel:0696334700" className="flex items-center gap-2 text-sm hover:text-accent transition-colors">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>06 96 33 47 00</span>
                    </a>
                    <a href="mailto:organisation@antillessalons.com" className="flex items-center gap-2 text-sm hover:text-accent transition-colors">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="break-all">organisation@antillessalons.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="order-1 lg:order-2">
              <div className="card lg:sticky lg:top-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent flex items-center justify-center">
                    <Store className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-primary">Formulaire de pré-inscription</h3>
                    <p className="text-gray-500 text-xs sm:text-sm">Réponse sous 48h</p>
                  </div>
                </div>
                <ExhibitorForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
