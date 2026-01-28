'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Instagram, Facebook, Calendar } from 'lucide-react'

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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-area-x">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - Salon des CSE & COS de Guadeloupe */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            {/* Logo mark avec texte SALON DES */}
            <div className="relative flex-shrink-0">
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl shadow-lg group-hover:shadow-xl transition-shadow px-2 py-1.5 sm:px-2.5 sm:py-2">
                <span className="text-accent font-black text-[8px] sm:text-[10px] tracking-wider block leading-none">SALON DES</span>
                <span className="text-white font-black text-sm sm:text-lg leading-none">CSE & COS</span>
              </div>
              {/* Edition badge */}
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 bg-accent rounded-full flex items-center justify-center shadow-md border-2 border-white">
                <span className="text-white text-[8px] sm:text-[10px] font-bold">32</span>
              </div>
            </div>
            {/* Text Guadeloupe */}
            <div className="flex flex-col">
              <span className="text-primary font-bold text-base sm:text-lg lg:text-xl leading-tight">
                <span className="text-accent">Guadeloupe</span>
              </span>
              <span className="text-gray-400 text-[10px] sm:text-xs font-medium tracking-wide">
                2 Octobre 2025
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
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

          {/* Social + CTA Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Social Icons */}
            <div className="flex items-center space-x-2">
              <a
                href="https://www.facebook.com/profile.php?id=100082995503866"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all duration-300 text-gray-600"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/salondescsemartinique/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 hover:text-white flex items-center justify-center transition-all duration-300 text-gray-600"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
            {/* Two CTA Buttons */}
            <Link href="/visiter" className="btn-outline-primary text-sm px-4 py-2">
              Visiter le Salon
            </Link>
            <Link href="/exposer" className="btn-accent text-sm px-4 py-2">
              Exposer au Salon
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -mr-2 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-6 h-6">
              <span className={`absolute left-0 top-1 w-6 h-0.5 bg-primary rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-3' : ''}`} />
              <span className={`absolute left-0 top-3 w-6 h-0.5 bg-primary rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 top-5 w-6 h-0.5 bg-primary rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-3' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: '64px' }}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Navigation Menu */}
      <div className={`lg:hidden fixed left-0 right-0 bg-white shadow-xl transition-all duration-300 ease-out ${
        isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
      }`}
        style={{ top: '64px' }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 safe-area-x">
          {/* Date badge mobile */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-accent/10 to-accent/5 text-accent-dark px-3 py-2.5 rounded-xl mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <Calendar size={16} className="text-accent" />
            </div>
            <div>
              <span className="text-sm font-semibold block">2 Octobre 2025</span>
              <span className="text-xs text-gray-500">Palais des Congrès de Madiana</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center text-gray-700 hover:text-primary hover:bg-primary/5 font-medium py-3 px-4 rounded-xl transition-all active:scale-[0.98]"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 my-4" />

          {/* CTA + Social */}
          <div className="space-y-3">
            <Link
              href="/visiter"
              className="btn-primary w-full text-center block"
              onClick={() => setIsMenuOpen(false)}
            >
              Visiter le Salon
            </Link>
            <Link
              href="/exposer"
              className="btn-accent w-full text-center block"
              onClick={() => setIsMenuOpen(false)}
            >
              Exposer au Salon
            </Link>
          </div>

          {/* Social */}
          <div className="flex items-center justify-center gap-3 pt-4 mt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">Suivez-nous</span>
            <a
              href="https://www.facebook.com/profile.php?id=100082995503866"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/salondescsemartinique/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
