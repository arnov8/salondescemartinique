import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'

export const metadata = {
  title: 'Contact | Salon des CSE & COS de Martinique 2025',
  description: 'Contactez l\'équipe du Salon des CSE & COS de Martinique 2025. Nous sommes là pour répondre à toutes vos questions.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="gradient-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-200">
              Une question sur le salon ? Notre équipe est à votre disposition
              pour vous accompagner.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Contact Info */}
            <div>
              <h2 className="section-title">Informations de contact</h2>
              <p className="text-gray-600 mb-8">
                N&apos;hésitez pas à nous contacter par téléphone, email ou via
                le formulaire ci-contre.
              </p>

              {/* Contact Cards */}
              <div className="space-y-6">
                <div className="card flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">Organisateur</h3>
                    <p className="font-semibold">Intersalon</p>
                    <p className="text-gray-600 text-sm">CC de Bellevue</p>
                    <p className="text-gray-600 text-sm">97200 Fort-de-France, Martinique</p>
                  </div>
                </div>

                <div className="card flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">Téléphone</h3>
                    <a
                      href="tel:0596612121"
                      className="text-lg font-semibold text-gray-800 hover:text-accent transition-colors"
                    >
                      05 96 61 21 21
                    </a>
                    <p className="text-gray-600 text-sm mt-1">Fax : 05 96 61 93 44</p>
                  </div>
                </div>

                <div className="card flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">Email</h3>
                    <a
                      href="mailto:intersaloncaraibe@yahoo.fr"
                      className="font-semibold text-gray-800 hover:text-accent transition-colors"
                    >
                      intersaloncaraibe@yahoo.fr
                    </a>
                    <p className="text-gray-600 text-sm mt-1">Réponse sous 24-48h</p>
                  </div>
                </div>

                <div className="card flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">Le jour du salon</h3>
                    <p className="font-semibold">Jeudi 2 Octobre 2025</p>
                    <p className="text-gray-600 text-sm">De 8h00 à 16h00</p>
                    <p className="text-gray-600 text-sm">Palais des Congrès de Madiana, Schœlcher</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="font-bold text-primary mb-4">Suivez-nous</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/salondescsemartinique/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white hover:bg-accent transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              <div className="card">
                <h2 className="text-2xl font-bold text-primary mb-2">Envoyez-nous un message</h2>
                <p className="text-gray-600 mb-6">
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Lieu du salon</h2>
            <p className="section-subtitle">
              Palais des Congrès de Madiana, 97233 Schœlcher, Martinique
            </p>
          </div>

          {/* Map placeholder */}
          <div className="aspect-video bg-gray-200 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Palais des Congrès de Madiana</p>
              <p className="text-gray-500 text-sm">Schœlcher, Martinique</p>
              <a
                href="https://maps.google.com/?q=Palais+des+Congrès+de+Madiana+Schoelcher+Martinique"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-4 inline-block"
              >
                Voir sur Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
