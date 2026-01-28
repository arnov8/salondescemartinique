import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ExternalLink, MessageCircle } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Organisateur',
    lines: ['Antilles Salons', 'Organisateur du Salon des CSE & COS'],
  },
  {
    icon: Phone,
    title: 'Téléphone',
    lines: ['06 96 26 30 96', '06 96 33 47 00'],
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'organisation@antillessalons.com',
    href: 'mailto:organisation@antillessalons.com',
    sub: 'Réponse sous 24-48h',
  },
  {
    icon: Clock,
    title: 'Le jour du salon',
    lines: ['Jeudi 2 Octobre 2025', '9h00 - 16h00', 'Madiana, Palais des Congrès, Schœlcher'],
  },
]

export const metadata = {
  title: 'Contact | Salon des CSE & COS de Martinique 2025',
  description: 'Contactez l\'équipe du Salon des CSE & COS de Martinique 2025. Nous sommes là pour répondre à toutes vos questions.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="gradient-primary py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Contactez-nous
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-200">
              Une question sur le salon ? Notre équipe est à votre disposition
              pour vous accompagner.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Contact Info */}
            <div className="order-2 lg:order-1">
              <h2 className="section-title text-center lg:text-left">Informations de contact</h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-center lg:text-left text-sm sm:text-base">
                N&apos;hésitez pas à nous contacter par téléphone, email ou via
                le formulaire ci-contre.
              </p>

              {/* Contact Cards - 2 columns on mobile */}
              <div className="grid xs:grid-cols-2 gap-3 sm:gap-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="card !p-4 sm:!p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-primary text-sm sm:text-base mb-1">{info.title}</h3>
                        {info.lines ? (
                          info.lines.map((line, i) => (
                            <p key={i} className={`text-xs sm:text-sm ${i === 0 ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                              {line}
                            </p>
                          ))
                        ) : (
                          <>
                            <a
                              href={info.href}
                              className="font-medium text-gray-800 hover:text-accent transition-colors text-sm block truncate"
                            >
                              {info.content}
                            </a>
                            {info.sub && <p className="text-gray-500 text-xs mt-0.5">{info.sub}</p>}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl">
                <h3 className="font-bold text-primary mb-3 sm:mb-4 text-sm sm:text-base">Suivez-nous</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.facebook.com/profile.php?id=100082995503866"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1877F2] rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                    <div className="text-sm">
                      <p className="font-medium text-gray-800">Salon des CSE Martinique</p>
                      <p className="text-gray-500 text-xs">Retrouvez-nous sur Facebook</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.instagram.com/salondescsemartinique/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                    <div className="text-sm">
                      <p className="font-medium text-gray-800">@salondescsemartinique</p>
                      <p className="text-gray-500 text-xs">Actualités et coulisses du salon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="order-1 lg:order-2">
              <div className="card lg:sticky lg:top-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">Envoyez-nous un message</h2>
                    <p className="text-gray-500 text-xs sm:text-sm">Réponse rapide garantie</p>
                  </div>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="section-title">Lieu du salon</h2>
            <p className="section-subtitle">
              Madiana, Palais des Congrès, 97233 Schœlcher, Martinique
            </p>
          </div>

          {/* Google Maps embed */}
          <div className="card !p-0 overflow-hidden">
            <div className="aspect-video sm:aspect-[21/9] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3822.7489752367!2d-61.09471392394127!3d14.626080485883832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c6aa1f4e0c7a9f9%3A0x8d35e9b4c6e9d0a5!2sPalais%20des%20Congr%C3%A8s%20de%20Madiana!5e0!3m2!1sfr!2smq!4v1700000000000!5m2!1sfr!2smq"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Palais des Congrès de Madiana - Lieu du Salon des CSE & COS"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Info under map */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm sm:text-base font-medium">Madiana, Palais des Congrès, Schœlcher</span>
            </div>
            <a
              href="https://maps.google.com/?q=Palais+des+Congrès+de+Madiana+Schoelcher+Martinique"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-primary inline-flex items-center gap-2 text-sm"
            >
              <span>Ouvrir dans Google Maps</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
