import { ShieldCheck, Database, Cookie, UserCheck, Share2, Lock, Mail } from 'lucide-react'

export const metadata = {
  title: 'Politique de confidentialité | Salon des CSE & COS de Martinique 2026',
  description: 'Politique de confidentialité et protection des données personnelles du Salon des CSE & COS de Martinique 2026.',
}

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-primary py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Politique de confidentialité
            </h1>
            <p className="text-base sm:text-lg text-gray-200">
              Protection de vos données personnelles conformément au RGPD
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 sm:space-y-8">

            {/* Responsable du traitement */}
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-primary">Responsable du traitement</h2>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Société', value: 'Intersalon' },
                  { label: 'Responsable', value: 'Françoise Valère' },
                  { label: 'Adresse', value: 'CC de Bellevue, 97200 Fort-de-France, Martinique' },
                  { label: 'Email', value: 'intersaloncaraibe@yahoo.fr' },
                  { label: 'Téléphone', value: '05 96 61 21 21' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 py-2 border-b border-gray-100 last:border-0">
                    <span className="text-base sm:text-sm font-medium text-gray-500 sm:w-44 flex-shrink-0">{item.label}</span>
                    <span className="text-base sm:text-sm text-gray-800 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Données collectées */}
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-primary">Données collectées</h2>
              </div>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  Dans le cadre de l&apos;utilisation du site et de l&apos;inscription au salon, nous sommes amenés
                  à collecter les données personnelles suivantes :
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { title: 'Formulaire visiteur', items: ['Nom et prénom', 'Fonction', 'Entreprise / CSE', 'Email professionnel', 'Téléphone', 'Nombre de participants'] },
                    { title: 'Formulaire exposant', items: ['Nom de l\'entreprise', 'Secteur d\'activité', 'Nom du contact', 'Email et téléphone', 'Adresse', 'Message'] },
                    { title: 'Formulaire de contact', items: ['Nom et prénom', 'Email', 'Téléphone', 'Sujet', 'Message'] },
                    { title: 'Données techniques', items: ['Adresse IP', 'Type de navigateur', 'Pages visitées', 'Données Google Analytics'] },
                  ].map((group, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-primary text-sm mb-2">{group.title}</h4>
                      <ul className="space-y-1">
                        {group.items.map((item, j) => (
                          <li key={j} className="text-xs text-gray-600 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Finalités */}
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-primary">Finalités du traitement</h2>
              </div>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>Les données personnelles collectées sont utilisées pour :</p>
                <ul className="space-y-3">
                  {[
                    'Gérer les inscriptions des visiteurs et des exposants au salon',
                    'Envoyer les confirmations d\'inscription et les informations pratiques',
                    'Répondre aux demandes de contact et de renseignements',
                    'Établir des statistiques de fréquentation du site (Google Analytics)',
                    'Assurer la sécurité du site et prévenir le spam',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-accent font-bold text-xs">{i + 1}</span>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Conservation */}
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-primary">Conservation et sécurité</h2>
              </div>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  Vos données personnelles sont conservées pour une durée maximale de <strong>3 ans</strong> à
                  compter de leur collecte ou du dernier contact avec vous.
                </p>
                <p>
                  Les données sont stockées de manière sécurisée via <strong>Google Sheets</strong> (hébergé par Google)
                  et transmises via des connexions chiffrées (HTTPS). Nous mettons en oeuvre toutes les mesures
                  techniques et organisationnelles nécessaires pour assurer la sécurité et la confidentialité
                  de vos données.
                </p>
                <p>
                  Les données ne sont en aucun cas vendues, échangées ou louées à des tiers.
                  Elles peuvent être partagées avec les exposants du salon uniquement dans le cadre de la mise
                  en relation avec les visiteurs inscrits, et avec votre consentement.
                </p>
              </div>
            </div>

            {/* Cookies */}
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-primary">Cookies</h2>
              </div>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  Ce site utilise des cookies pour assurer son bon fonctionnement et mesurer son audience.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-primary text-sm mb-2">Cookies essentiels</h4>
                    <p className="text-xs text-gray-600">
                      Nécessaires au fonctionnement du site. Ils ne peuvent pas être désactivés.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-primary text-sm mb-2">Cookies analytiques</h4>
                    <p className="text-xs text-gray-600">
                      Google Analytics : mesure d&apos;audience anonymisée pour améliorer le site.
                    </p>
                  </div>
                </div>
                <p>
                  Vous pouvez à tout moment modifier vos préférences en matière de cookies via
                  les paramètres de votre navigateur.
                </p>
              </div>
            </div>

            {/* Droits */}
            <div className="card bg-gradient-to-br from-primary/5 to-transparent">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-primary">Vos droits</h2>
              </div>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
                  Informatique et Libertés, vous disposez des droits suivants :
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {[
                    'Droit d\'accès',
                    'Droit de rectification',
                    'Droit d\'effacement',
                    'Droit à la portabilité',
                    'Droit d\'opposition',
                    'Droit à la limitation',
                  ].map((right, i) => (
                    <div key={i} className="bg-white rounded-lg px-3 py-2 text-center border border-gray-100">
                      <span className="text-xs font-medium text-primary">{right}</span>
                    </div>
                  ))}
                </div>
                <p>
                  Pour exercer ces droits, vous pouvez nous contacter à l&apos;adresse :
                </p>
                <div className="bg-white rounded-xl p-4 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <a href="mailto:intersaloncaraibe@yahoo.fr" className="font-medium text-primary hover:text-accent transition-colors">
                      intersaloncaraibe@yahoo.fr
                    </a>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Merci de joindre une copie de votre pièce d&apos;identité à votre demande.
                    </p>
                  </div>
                </div>
                <p>
                  Vous pouvez également introduire une réclamation auprès de la
                  <strong> CNIL</strong> (Commission Nationale de l&apos;Informatique et des Libertés) :
                  <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline ml-1">
                    www.cnil.fr
                  </a>
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
