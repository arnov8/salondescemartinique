import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Users, Store, Briefcase, Gift, Plane, GraduationCap, ArrowRight, CheckCircle, Award, Clock, Building2, PartyPopper, CreditCard } from 'lucide-react'

const stats = [
  { icon: Store, value: '+60', label: 'Exposants' },
  { icon: Users, value: '+700', label: 'Visiteurs' },
  { icon: Award, value: '32ème', label: 'Édition' },
]

const sectors = [
  { icon: Plane, name: 'Voyages', desc: 'Agences & séjours' },
  { icon: Gift, name: 'Cadeaux', desc: 'Chèques & billetterie' },
  { icon: Briefcase, name: 'Services', desc: 'Conseil & gestion' },
  { icon: GraduationCap, name: 'Formation', desc: 'Juridique & RH' },
  { icon: Store, name: 'Fournisseurs', desc: 'Produits & équipements' },
  { icon: Building2, name: 'Lieux de réception', desc: 'Événements & séminaires' },
  { icon: PartyPopper, name: 'Activités', desc: 'Team building & loisirs' },
  { icon: CreditCard, name: 'Cartes cadeaux', desc: 'Multi-enseignes' },
]

const advantages = [
  'Rencontrez +60 prestataires et fournisseurs qualifiés',
  'Découvrez les solutions adaptées à votre CSE/COS',
  'Assistez à une conférence animée par un expert',
  'Participez à la Grande Tombola des Comités',
  'Échangez avec vos pairs responsables CSE/COS',
  'Entrée gratuite sur inscription',
]

const allSectors = [
  'Agences de voyage',
  'Chèques cadeaux',
  'Animation & Spectacles',
  'Hôtellerie',
  'Loisirs & Culture',
  'Conseil juridique',
  'Formation',
  'Assurance & Mutuelle',
  'Vins & Traiteurs',
  'Bien-être & Spa',
  'Jouets & Enfants',
  'Banque & Finance',
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/video-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>

        {/* Color Overlay */}
        <div className="absolute inset-0 bg-primary/80" />

        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-white text-center lg:text-left">
              <span className="badge mb-4 sm:mb-6">
                32ème Édition
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Salon des CSE &amp; COS{' '}
                <span className="text-accent whitespace-nowrap">Martinique</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
                Le rendez-vous annuel des responsables de Comités Sociaux et Économiques
                et Comités d&apos;Œuvres Sociales en Martinique.
              </p>

              {/* Event Info - Mobile optimized */}
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center lg:justify-start">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm sm:text-base">Jeudi 2 Octobre 2025</p>
                    <p className="text-xs sm:text-sm text-gray-300 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 8h00 - 16h00
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm sm:text-base">Palais des Congrès</p>
                    <p className="text-xs sm:text-sm text-gray-300">Madiana, Schœlcher</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link href="/visiter" className="btn-accent inline-flex items-center justify-center gap-2">
                  Je visite le salon
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <Link href="/exposer" className="btn-outline inline-flex items-center justify-center gap-2">
                  Devenir exposant
                </Link>
              </div>
            </div>

            {/* Right Content - Stats Cards - Horizontal on mobile */}
            <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 mt-4 lg:mt-0">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-card text-white"
                >
                  <stat.icon className="w-6 h-6 sm:w-8 md:w-10 sm:h-8 md:h-10 text-accent sm:mx-auto flex-shrink-0" />
                  <div className="sm:text-center">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-accent">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-gray-300">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator - hidden on very small screens */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden xs:flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs uppercase tracking-wider">Découvrir</span>
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/60 rounded-full mt-1.5 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="section-title">Un salon dédié aux CSE &amp; COS</h2>
            <p className="section-subtitle">
              Découvrez une large gamme de produits et services spécialement conçus
              pour les Comités Sociaux et Économiques.
            </p>
          </div>

          {/* Sectors Grid - 4 columns now with 8 items */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-8 sm:mb-12">
            {sectors.map((sector, index) => (
              <div
                key={index}
                className="card text-center group cursor-pointer !p-4 sm:!p-5"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <sector.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-800 text-sm sm:text-base">{sector.name}</h3>
                <p className="text-gray-500 text-xs mt-0.5 hidden sm:block">{sector.desc}</p>
              </div>
            ))}
          </div>

          {/* All Sectors Grid */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg border border-gray-100">
            <h3 className="text-lg sm:text-xl font-bold text-primary mb-4 sm:mb-6 text-center">Tous les secteurs représentés</h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {allSectors.map((sector, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-0 hover:bg-gray-50 rounded-lg transition-colors">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{sector}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Visit Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="section-title text-center lg:text-left">Pourquoi visiter le salon ?</h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-center lg:text-left">
                En une journée, rencontrez les meilleurs prestataires et découvrez
                des solutions adaptées aux missions de votre CSE ou COS.
              </p>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {advantages.map((advantage, index) => (
                  <li key={index} className="flex items-start gap-3 p-2 sm:p-0 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base">{advantage}</span>
                  </li>
                ))}
              </ul>
              <div className="text-center lg:text-left">
                <Link href="/visiter" className="btn-primary inline-flex items-center gap-2">
                  S&apos;inscrire gratuitement
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/visuel-2025.jpg"
                  alt="Salon des CSE & COS Martinique 2025"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/30 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/20">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                      <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-base sm:text-lg font-bold">Grande Tombola des Comités</p>
                      <p className="text-xs sm:text-sm text-white/80">De nombreux cadeaux à gagner !</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Badge journée */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 lg:-bottom-6 lg:-right-6 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-accent to-accent-dark rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <p className="text-2xl sm:text-3xl font-bold">1</p>
                  <p className="text-xs sm:text-sm font-semibold">journée</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 gradient-primary relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Vous êtes prestataire ou fournisseur ?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Rejoignez les +60 exposants et présentez vos produits et services
            aux décideurs CSE &amp; COS de Martinique.
          </p>
          <Link href="/exposer" className="btn-accent inline-flex items-center gap-2">
            Réserver votre stand
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="section-title">Comment nous trouver ?</h2>
            <p className="section-subtitle">
              Le salon se déroule au Palais des Congrès de Madiana,
              un lieu prestigieux et facilement accessible.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="card">
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                Adresse
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Palais des Congrès de Madiana</p>
                    <p className="text-gray-600 text-sm">97233 Schœlcher, Martinique</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Jeudi 2 Octobre 2025</p>
                    <p className="text-gray-600 text-sm">De 8h00 à 16h00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                Organisateur
              </h3>
              <p className="font-semibold mb-1 text-sm sm:text-base">Intersalon</p>
              <p className="text-gray-600 text-sm mb-4">CC de Bellevue, 97200 Fort-de-France</p>
              <div className="space-y-2 text-sm">
                <a href="tel:0596612121" className="flex items-center gap-2 text-gray-700 hover:text-accent transition-colors p-2 -mx-2 rounded-lg hover:bg-gray-50">
                  <span className="font-medium w-12">Tél :</span>
                  <span className="text-primary">05 96 61 21 21</span>
                </a>
                <a href="mailto:intersaloncaraibe@yahoo.fr" className="flex items-center gap-2 text-gray-700 hover:text-accent transition-colors p-2 -mx-2 rounded-lg hover:bg-gray-50">
                  <span className="font-medium w-12">Email :</span>
                  <span className="text-primary break-all">intersaloncaraibe@yahoo.fr</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
