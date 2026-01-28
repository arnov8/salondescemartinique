import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Calendar, Instagram, Facebook, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 safe-area-x">
        {/* Mobile-first: Single column on mobile, grid on larger screens */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          {/* About */}
          <div className="xs:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src="/images/logo-blanc.png"
                  alt="Logo Salon CSE"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <span className="font-bold text-base sm:text-lg">Salon des CSE &amp; COS</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Le rendez-vous annuel des responsables de Comités Sociaux et Économiques
              et Comités d&apos;Œuvres Sociales en Guadeloupe.
            </p>
            {/* Social Links - Mobile visible here */}
            <div className="flex gap-3 mt-4 sm:mt-6">
              <a
                href="https://www.facebook.com/profile.php?id=100082995503866"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1877F2] rounded-xl flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/salondescsemartinique/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-white/90">Navigation</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-accent transition-colors text-sm inline-flex items-center gap-1">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/visiter" className="text-gray-300 hover:text-accent transition-colors text-sm inline-flex items-center gap-1">
                  Visiter le salon
                </Link>
              </li>
              <li>
                <Link href="/exposer" className="text-gray-300 hover:text-accent transition-colors text-sm inline-flex items-center gap-1">
                  Devenir exposant
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-accent transition-colors text-sm inline-flex items-center gap-1">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-white/90">L&apos;événement</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Jeudi 2 Octobre 2025</p>
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 8h00 - 16h00
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Palais des Congrès</p>
                  <p className="text-gray-400 text-xs">Guadeloupe</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-white/90">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:0696263096" className="flex items-center gap-3 text-gray-300 hover:text-accent transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/10 group-hover:bg-accent/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm">06 96 26 30 96</span>
                </a>
              </li>
              <li>
                <a href="tel:0696334700" className="flex items-center gap-3 text-gray-300 hover:text-accent transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/10 group-hover:bg-accent/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm">06 96 33 47 00</span>
                </a>
              </li>
              <li>
                <a href="mailto:organisation@antillessalons.com" className="flex items-center gap-3 text-gray-300 hover:text-accent transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/10 group-hover:bg-accent/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm break-all">organisation@antillessalons.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-gray-400 text-xs sm:text-sm">
              Organisé par <span className="text-white font-medium">Antilles Salons</span>
            </p>
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Salon des CSE &amp; COS de Guadeloupe
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
