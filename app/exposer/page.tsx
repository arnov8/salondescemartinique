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

      {/* Contenu détaillé */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="section-title">Développez votre activité auprès des comités d&apos;entreprise</h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Le <strong>Salon des CSE &amp; COS de Martinique</strong> est le plus grand rassemblement de responsables
              de comités d&apos;entreprise sur le territoire. Depuis <strong>32 ans</strong>, nous offrons aux prestataires
              et fournisseurs une plateforme unique pour rencontrer directement les décideurs et développer leur portefeuille clients.
            </p>
          </div>

          {/* Une opportunité unique */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-16">
            <div className="bg-gradient-to-br from-accent/10 to-transparent p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">Une opportunité commerciale unique</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Le salon réunit chaque année <strong>plus de 700 visiteurs qualifiés</strong>, tous membres actifs
                de CSE ou COS. Ces décideurs viennent avec un objectif précis : <strong>trouver des prestataires</strong>
                pour améliorer les avantages proposés aux salariés de leur entreprise.
              </p>
              <p className="text-gray-600 leading-relaxed">
                C&apos;est une occasion rare de rencontrer en une seule journée autant de prospects qualifiés,
                prêts à <strong>concrétiser des partenariats</strong> et à passer commande pour leurs collaborateurs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-transparent p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">Qui sont les visiteurs ?</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Les visiteurs du salon sont exclusivement des <strong>membres de bureau de CSE et COS</strong> :
                secrétaires, trésoriers, présidents, élus du personnel. Ce sont eux qui décident des prestataires
                retenus et gèrent les budgets des activités sociales et culturelles.
              </p>
              <p className="text-gray-600 leading-relaxed">
                En Martinique, les CSE représentent des milliers de salariés bénéficiaires potentiels
                pour vos produits et services. Un contact réussi au salon peut se traduire par des
                <strong> commandes récurrentes sur plusieurs années</strong>.
              </p>
            </div>
          </div>

          {/* Les chiffres clés */}
          <div className="bg-primary rounded-2xl p-6 sm:p-8 lg:p-10 text-white mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center">Les chiffres clés du salon</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-2">32</div>
                <p className="text-gray-300 text-sm sm:text-base">années d&apos;existence</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-2">+60</div>
                <p className="text-gray-300 text-sm sm:text-base">exposants partenaires</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-2">~700</div>
                <p className="text-gray-300 text-sm sm:text-base">visiteurs qualifiés</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-2">~200</div>
                <p className="text-gray-300 text-sm sm:text-base">CSE/COS représentés</p>
              </div>
            </div>
          </div>

          {/* Secteurs recherchés */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-6 text-center">Les secteurs les plus recherchés par les CSE</h3>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Les responsables de comités recherchent des prestataires dans de nombreux domaines pour satisfaire les attentes de leurs bénéficiaires.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Voyages et séjours organisés',
                'Billetteries et parcs d\'attraction',
                'Chèques cadeaux multi-enseignes',
                'Animation et spectacles',
                'Hôtellerie locale et internationale',
                'Loisirs nautiques et sportifs',
                'Formation professionnelle',
                'Assurance et prévoyance',
                'Traiteurs pour événements',
                'Bien-être et soins esthétiques',
                'Jouets et cadeaux de Noël',
                'Services bancaires dédiés CE'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visibilité */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <div className="card !p-6 sm:!p-8 border-l-4 border-l-accent">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-primary">Visibilité médiatique</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Le Salon des CSE &amp; COS bénéficie d&apos;une <strong>forte couverture médiatique</strong> en Martinique.
                En tant qu&apos;exposant, vous profitez de cette visibilité : annonces sur RCI, articles dans la presse locale,
                communication sur les réseaux sociaux.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Votre participation au salon renforce votre <strong>crédibilité</strong> auprès des comités d&apos;entreprise
                et positionne votre marque comme un acteur de référence dans votre secteur.
              </p>
            </div>

            <div className="card !p-6 sm:!p-8 border-l-4 border-l-primary">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Handshake className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-primary">Contact direct avec les décideurs</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Contrairement à d&apos;autres canaux commerciaux, le salon vous met en <strong>contact direct</strong>
                avec les personnes qui prennent les décisions d&apos;achat. Pas d&apos;intermédiaire, pas de filtrage :
                vous présentez vos offres directement aux responsables de budgets.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Les visiteurs viennent avec des <strong>projets concrets</strong> et des besoins identifiés.
                C&apos;est le moment idéal pour convertir un prospect en client fidèle.
              </p>
            </div>
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
