import { Scale, Building2, Globe, Server, PenTool, Shield } from 'lucide-react'

export const metadata = {
  title: 'Mentions légales | Salon des CSE & COS de Martinique 2026',
  description: 'Mentions légales du site du Salon des CSE & COS de Martinique 2026.',
}

const sections = [
  {
    icon: Building2,
    title: 'Éditeur du site',
    content: [
      { label: 'Raison sociale', value: 'Intersalon' },
      { label: 'Responsable de la publication', value: 'Françoise Valère, Gérante' },
      { label: 'Adresse', value: 'CC de Bellevue, 97200 Fort-de-France, Martinique' },
      { label: 'Téléphone', value: '05 96 61 21 21' },
      { label: 'Email', value: 'intersaloncaraibe@yahoo.fr' },
      { label: 'SIRET', value: 'XXX XXX XXX XXXXX' },
      { label: 'N° TVA intracommunautaire', value: 'XX XXXXXXXXXXX' },
    ],
  },
  {
    icon: Server,
    title: 'Hébergement',
    content: [
      { label: 'Hébergeur', value: 'Vercel Inc.' },
      { label: 'Adresse', value: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis' },
      { label: 'Site web', value: 'https://vercel.com' },
    ],
  },
  {
    icon: PenTool,
    title: 'Conception et développement',
    content: [
      { label: 'Conception', value: 'XXX' },
      { label: 'Développement', value: 'XXX' },
    ],
  },
]

export default function MentionsLegalesPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-primary py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Scale className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Mentions légales
            </h1>
            <p className="text-base sm:text-lg text-gray-200">
              Informations légales relatives au site salondescsemartinique.com
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Cards principales */}
          <div className="space-y-6 sm:space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary">{section.title}</h2>
                </div>
                <div className="space-y-3">
                  {section.content.map((item, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 py-2 border-b border-gray-100 last:border-0">
                      <span className="text-base sm:text-sm font-medium text-gray-500 sm:w-56 flex-shrink-0">{item.label}</span>
                      <span className="text-base sm:text-sm text-gray-800 font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Propriété intellectuelle */}
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-primary">Propriété intellectuelle</h2>
              </div>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, vidéos, etc.)
                  est la propriété exclusive d&apos;Intersalon ou de ses partenaires et est protégé par les lois
                  françaises et internationales relatives à la propriété intellectuelle.
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication, adaptation de tout ou partie
                  des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans
                  l&apos;autorisation écrite préalable d&apos;Intersalon.
                </p>
              </div>
            </div>

            {/* Responsabilité */}
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-primary">Limitation de responsabilité</h2>
              </div>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  Intersalon s&apos;efforce d&apos;assurer au mieux l&apos;exactitude et la mise à jour des informations
                  diffusées sur ce site. Toutefois, Intersalon ne peut garantir l&apos;exactitude, la précision
                  ou l&apos;exhaustivité des informations mises à disposition sur ce site.
                </p>
                <p>
                  Intersalon décline toute responsabilité pour toute imprécision, inexactitude ou omission
                  portant sur des informations disponibles sur ce site, ainsi que pour tout dommage résultant
                  d&apos;une intrusion frauduleuse d&apos;un tiers ayant entraîné une modification des informations
                  mises à disposition sur le site.
                </p>
              </div>
            </div>
          </div>

          {/* Date de mise à jour */}
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-xs sm:text-sm text-gray-400">
              Dernière mise à jour : Février 2026
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
