import { Calendar, MapPin, Clock, CheckCircle, Users, Gift, Briefcase, Ticket, Car, Snowflake } from 'lucide-react'
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
    description: 'Assistez à une conférence exclusive animée par un expert en droit du travail ou expert-comptable.',
  },
  {
    icon: Gift,
    title: 'La Grande Tombola des Comités',
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
  { icon: Snowflake, text: 'Espace d\'exposition climatisé' },
]

export const metadata = {
  title: 'Visiter | Salon des CSE & COS de Martinique 2025',
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
              Visiter
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

      {/* Contenu détaillé */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="section-title">Découvrez le rendez-vous incontournable des comités</h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Le <strong>Salon des CSE &amp; COS de Martinique</strong> est l&apos;événement professionnel de référence
              pour les Comités Sociaux et Économiques et les Comités d&apos;Œuvres Sociales. Depuis <strong>32 ans</strong>,
              nous rassemblons chaque année les acteurs clés du monde des comités d&apos;entreprise autour d&apos;une journée
              riche en découvertes, en échanges et en opportunités.
            </p>
          </div>

          {/* Un événement conçu pour vous */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-16">
            <div className="bg-gradient-to-br from-primary/5 to-transparent p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">Un événement conçu pour vous</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Le salon se tiendra le <strong>Jeudi 2 Octobre 2025</strong>, de <strong>8h00 à 16h00</strong>,
                au <strong>Palais des Congrès de Madiana</strong> à Schœlcher. L&apos;entrée est <strong>gratuite</strong>,
                mais l&apos;inscription est obligatoire et réservée exclusivement aux membres de CSE et COS.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Cette journée unique vous permettra de rencontrer <strong>plus de 60 exposants</strong> soigneusement
                sélectionnés, représentant l&apos;ensemble des secteurs d&apos;activité utiles à vos missions :
                voyages, loisirs, billetterie, chèques cadeaux, formation, assurance, bien-être, et bien d&apos;autres encore.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/10 to-transparent p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">Faites-vous conseiller</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                En tant que membre d&apos;un CSE ou COS, vous avez la responsabilité de proposer les meilleurs
                avantages à vos collègues salariés. Le salon est l&apos;occasion idéale de <strong>comparer les offres</strong>,
                de <strong>négocier directement</strong> avec les prestataires et de découvrir les <strong>dernières
                nouveautés</strong> du marché.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Les exposants présents sont des professionnels habitués à travailler avec les comités d&apos;entreprise.
                Ils comprennent vos contraintes budgétaires et réglementaires, et sauront vous proposer des solutions
                <strong> adaptées à la taille de votre entreprise</strong> et aux attentes de vos bénéficiaires.
              </p>
            </div>
          </div>

          {/* Profils exposants */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-6 text-center">Les exposants que vous rencontrerez</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Agences de voyage et tour-opérateurs',
                'Billetteries et chèques cadeaux',
                'Animation et spectacles',
                'Hôtellerie et hébergements',
                'Loisirs, sports et culture',
                'Conseil juridique et gestion CSE',
                'Organismes de formation',
                'Assurances et mutuelles',
                'Traiteurs et vins',
                'Bien-être, spa et esthétique',
                'Jouets et univers enfants',
                'Banques et services financiers',
                'Bureautique et imprimerie',
                'Objets publicitaires',
                'Espaces de réception'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conférence & Tombola */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12 sm:mb-16">
            <div className="card !p-6 sm:!p-8 border-l-4 border-l-primary">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-primary">La Conférence CSE/COS</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Profitez de la <strong>conférence exclusive</strong> animée par un expert en droit du travail
                ou un expert-comptable spécialisé dans les CSE. Cette intervention vous permettra de mieux
                comprendre vos droits, vos obligations et les bonnes pratiques à adopter dans la gestion
                quotidienne de votre comité.
              </p>
              <p className="text-gray-600 leading-relaxed">
                C&apos;est également un moment privilégié pour poser vos questions et échanger avec d&apos;autres
                responsables de comités confrontés aux mêmes problématiques.
              </p>
            </div>

            <div className="card !p-6 sm:!p-8 border-l-4 border-l-accent">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Gift className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-primary">La Grande Tombola des Comités</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Tous les visiteurs inscrits peuvent participer à la <strong>Grande Tombola des Comités</strong>.
                De nombreux cadeaux sont à gagner grâce à la générosité de nos exposants partenaires :
                séjours, bons d&apos;achat, coffrets cadeaux, et bien d&apos;autres surprises !
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong>Attention :</strong> pour remporter un cadeau, vous devez impérativement être
                présent lors du tirage au sort qui aura lieu en fin de journée.
              </p>
            </div>
          </div>

          {/* Comment participer */}
          <div className="bg-primary rounded-2xl p-6 sm:p-8 lg:p-10 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">Comment participer ?</h3>
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">1</span>
                </div>
                <h4 className="font-semibold mb-2">Inscrivez-vous</h4>
                <p className="text-gray-300 text-sm">
                  Remplissez le formulaire d&apos;inscription ci-dessous. L&apos;entrée est gratuite mais obligatoire.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">2</span>
                </div>
                <h4 className="font-semibold mb-2">Recevez votre badge</h4>
                <p className="text-gray-300 text-sm">
                  Après validation de votre inscription, vous recevrez votre badge visiteur par email.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">3</span>
                </div>
                <h4 className="font-semibold mb-2">Venez le Jour J</h4>
                <p className="text-gray-300 text-sm">
                  Présentez-vous le 2 octobre avec votre badge. Parking gratuit sur place.
                </p>
              </div>
            </div>
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
                    <h3 className="font-bold text-gray-800 mb-1 text-sm sm:text-base">Grande Tombola des Comités</h3>
                    <p className="text-sm text-gray-600">
                      Tous les visiteurs du salon peuvent participer à la grande tombola des Comités, ils peuvent tenter de remporter de nombreux cadeaux ! Attention pour remporter un cadeau, il faut être présent lors du tirage au sort.
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
                    <p className="text-gray-500 text-xs sm:text-sm">Entrée réservée aux membres de CSE et COS inscrits et enregistrés uniquement.</p>
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
