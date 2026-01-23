import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Users, Store, Briefcase, Gift, Plane, GraduationCap, ArrowRight, CheckCircle, Award } from 'lucide-react'

const stats = [
  { icon: Store, value: '+60', label: 'Exposants' },
  { icon: Users, value: '+700', label: 'Visiteurs' },
  { icon: Award, value: '32ème', label: 'Édition' },
]

const sectors = [
  { icon: Plane, name: 'Voyages' },
  { icon: Gift, name: 'Cadeaux' },
  { icon: Briefcase, name: 'Services' },
  { icon: GraduationCap, name: 'Formation' },
]

const advantages = [
  'Rencontrez +60 prestataires et fournisseurs qualifiés',
  'Découvrez les solutions adaptées à votre CSE/COS',
  'Assistez à une conférence animée par un expert',
  'Participez à la Tombola des CE',
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
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/video-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>

        {/* Color Overlay */}
        <div className="absolute inset-0 bg-primary/75" />

        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <span className="inline-block bg-accent text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                32ème Édition
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Salon des CSE &amp; COS
                <span className="text-accent block">Martinique 2025</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-lg">
                Le rendez-vous annuel des responsables de Comités Sociaux et Économiques
                et Comités d&apos;Œuvres Sociales en Martinique.
              </p>

              {/* Event Info */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-accent" />
                  <div>
                    <p className="font-semibold">Jeudi 2 Octobre 2025</p>
                    <p className="text-sm text-gray-300">8h00 - 16h00</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-accent" />
                  <div>
                    <p className="font-semibold">Palais des Congrès</p>
                    <p className="text-sm text-gray-300">Madiana, Schœlcher</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/visiter" className="btn-accent inline-flex items-center justify-center gap-2">
                  Je visite le salon
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/exposer" className="btn-outline inline-flex items-center justify-center gap-2">
                  Devenir exposant
                </Link>
              </div>
            </div>

            {/* Right Content - Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="card-glass text-center text-white p-6"
                >
                  <stat.icon className="w-10 h-10 text-accent mx-auto mb-3" />
                  <p className="text-3xl font-bold text-accent">{stat.value}</p>
                  <p className="text-sm text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Un salon dédié aux CSE &amp; COS</h2>
            <p className="section-subtitle">
              Découvrez une large gamme de produits et services spécialement conçus
              pour les Comités Sociaux et Économiques et Comités d&apos;Œuvres Sociales.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {sectors.map((sector, index) => (
              <div
                key={index}
                className="card text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <sector.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-800">{sector.name}</h3>
              </div>
            ))}
          </div>

          {/* All Sectors Grid */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-primary mb-6 text-center">Tous les secteurs représentés</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allSectors.map((sector, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{sector}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Visit Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Pourquoi visiter le salon ?</h2>
              <p className="text-gray-600 mb-8">
                En une journée, rencontrez les meilleurs prestataires et découvrez
                des solutions adaptées aux missions de votre CSE ou COS :
                billetterie, voyages, loisirs, formations juridiques, expertise comptable...
              </p>
              <ul className="space-y-4 mb-8">
                {advantages.map((advantage, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{advantage}</span>
                  </li>
                ))}
              </ul>
              <Link href="/visiter" className="btn-primary inline-flex items-center gap-2">
                S&apos;inscrire gratuitement
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/visuel-2025.jpg"
                  alt="Salon des CSE & COS Martinique 2025"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <Gift className="w-12 h-12 mb-3 text-accent" />
                  <p className="text-xl font-bold">Tombola des CE</p>
                  <p className="text-sm">Cadeaux à gagner !</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent rounded-2xl flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <p className="text-3xl font-bold">1</p>
                  <p className="text-sm font-semibold">journée</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Vous êtes prestataire ou fournisseur ?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Rejoignez les +60 exposants et présentez vos produits et services
            aux décideurs CSE &amp; COS de Martinique.
          </p>
          <Link href="/exposer" className="btn-accent inline-flex items-center gap-2 text-lg">
            Réserver votre stand
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Comment nous trouver ?</h2>
            <p className="section-subtitle">
              Le salon se déroule au Palais des Congrès de Madiana,
              un lieu prestigieux et facilement accessible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold text-primary mb-4">Adresse</h3>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-6 h-6 text-accent flex-shrink-0" />
                <div>
                  <p className="font-semibold">Palais des Congrès de Madiana</p>
                  <p className="text-gray-600">97233 Schœlcher, Martinique</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-6 h-6 text-accent flex-shrink-0" />
                <div>
                  <p className="font-semibold">Jeudi 2 Octobre 2025</p>
                  <p className="text-gray-600">De 8h00 à 16h00</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-primary mb-4">Organisateur</h3>
              <p className="font-semibold mb-2">Intersalon</p>
              <p className="text-gray-600 mb-4">CC de Bellevue, 97200 Fort-de-France</p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Tél :</span>{' '}
                  <a href="tel:0596612121" className="text-primary hover:text-accent">05 96 61 21 21</a>
                </p>
                <p>
                  <span className="font-medium">Email :</span>{' '}
                  <a href="mailto:intersaloncaraibe@yahoo.fr" className="text-primary hover:text-accent">
                    intersaloncaraibe@yahoo.fr
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
