'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X, Instagram } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/visiter', label: 'Visiter' },
  { href: '/exposer', label: 'Exposer' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-14 h-14 bg-primary rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/images/logo-blanc.png"
                alt="Logo Salon CSE"
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-primary font-bold text-lg leading-tight block">Salon des CSE &amp; COS</span>
              <span className="text-gray-500 text-sm">Martinique 2025</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary font-medium transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Social + CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://www.instagram.com/salondescsemartinique/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200"
            >
              <Instagram size={18} />
            </a>
            <Link href="/exposer" className="btn-accent text-sm">
              Devenir Exposant
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-primary" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}>
          <div className="flex flex-col space-y-2 pt-4 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-center py-4">
              <a
                href="https://www.instagram.com/salondescsemartinique/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
              >
                <Instagram size={20} />
              </a>
            </div>
            <Link
              href="/exposer"
              className="btn-accent text-center mx-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Devenir Exposant
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
