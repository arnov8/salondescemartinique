import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Calendar, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-12 h-12 bg-accent rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src="/images/logo-blanc.png"
                  alt="Logo Salon CSE"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <span className="font-bold text-lg">Salon des CSE &amp; COS</span>
            </div>
            <p className="text-gray-300 text-sm">
              Le rendez-vous annuel des responsables de Comités Sociaux et Économiques
              et Comités d&apos;Œuvres Sociales en Martinique.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-accent transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/visiter" className="text-gray-300 hover:text-accent transition-colors">
                  Visiter le salon
                </Link>
              </li>
              <li>
                <Link href="/exposer" className="text-gray-300 hover:text-accent transition-colors">
                  Devenir exposant
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Informations</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Jeudi 2 Octobre 2025<br />8h00 - 16h00</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Palais des Congrès de Madiana<br />Schœlcher, Martinique</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="tel:0596612121" className="text-gray-300 text-sm hover:text-accent transition-colors">05 96 61 21 21</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="mailto:intersaloncaraibe@yahoo.fr" className="text-gray-300 text-sm hover:text-accent transition-colors">intersaloncaraibe@yahoo.fr</a>
              </li>
            </ul>
            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.instagram.com/salondescsemartinique/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Organisateur */}
        <div className="border-t border-gray-600 mt-8 pt-8">
          <div className="text-center mb-4">
            <p className="text-gray-400 text-sm">
              Organisé par <span className="text-white font-semibold">Intersalon</span> - CC de Bellevue, 97200 Fort-de-France
            </p>
          </div>
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Salon des CSE &amp; COS de Martinique. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
