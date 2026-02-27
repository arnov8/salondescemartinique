'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const photos = [
  { src: '/images/galerie/salon-1.jpg', alt: 'Ambiance du Salon des CSE Martinique' },
  { src: '/images/galerie/salon-2.jpg', alt: 'Exposants au Salon des CSE' },
  { src: '/images/galerie/salon-3.jpg', alt: 'Visiteurs du Salon des CSE' },
  { src: '/images/galerie/salon-4.jpg', alt: 'Stands du Salon des CSE Martinique' },
  { src: '/images/galerie/salon-5.jpg', alt: 'Échanges au Salon des CSE' },
]

export default function PhotoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 2)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll])

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = direction === 'left' ? -(el.clientWidth * 0.6) : (el.clientWidth * 0.6)
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section className="py-10 sm:py-12 bg-gray-50 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-12 sm:px-14">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200 transition-all duration-200 hover:shadow-lg hover:scale-105 ${
            canScrollLeft ? 'opacity-100' : 'opacity-30 pointer-events-none'
          }`}
          aria-label="Défiler vers la gauche"
        >
          <ChevronLeft className="w-5 h-5 text-primary" />
        </button>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
          {photos.map((photo, index) => (
            <div
              key={index}
              className="flex-none w-[65%] sm:w-[40%] md:w-[30%] select-none"
            >
              <div className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 23vw"
                  priority={index < 4}
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className={`absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200 transition-all duration-200 hover:shadow-lg hover:scale-105 ${
            canScrollRight ? 'opacity-100' : 'opacity-30 pointer-events-none'
          }`}
          aria-label="Défiler vers la droite"
        >
          <ChevronRight className="w-5 h-5 text-primary" />
        </button>
      </div>
    </section>
  )
}
