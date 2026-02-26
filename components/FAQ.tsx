'use client'

import { useState } from 'react'
import { ChevronDown, Ticket, FileText, Car, Users } from 'lucide-react'

const faqs = [
  {
    icon: Ticket,
    question: 'Le salon est-il gratuit pour les visiteurs ?',
    answer:
      'Oui, l\'entrée est gratuite sur inscription pour tous les membres de CSE et COS.',
  },
  {
    icon: FileText,
    question: 'Comment devenir exposant ?',
    answer:
      'Remplissez le formulaire de pré-inscription sur notre page "Exposer" ou contactez-nous directement. Notre équipe vous recontactera sous 48h.',
  },
  {
    icon: Car,
    question: 'Y a-t-il un parking sur place ?',
    answer:
      'Oui, un parking gratuit est disponible sur place à Madiana Palais des Congrès.',
  },
  {
    icon: Users,
    question: 'Puis-je venir avec mes collègues ?',
    answer:
      'Absolument ! Le salon est ouvert aux membres des comités dans la limite de 7 personnes par Comité. Venez en groupe pour découvrir ensemble les offres des exposants.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            className={`card !p-0 overflow-hidden transition-all duration-300 ${
              isOpen ? 'ring-2 ring-accent/30 shadow-lg' : ''
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 text-left hover:bg-gray-50/50 transition-colors"
            >
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                  isOpen ? 'bg-accent/15' : 'bg-primary/10'
                }`}
              >
                <faq.icon
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isOpen ? 'text-accent' : 'text-primary'
                  }`}
                />
              </div>
              <span className="flex-1 font-semibold text-base sm:text-base text-primary">
                {faq.question}
              </span>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isOpen ? 'bg-accent/10 rotate-180' : 'bg-gray-100'
                }`}
              >
                <ChevronDown
                  className={`w-4 h-4 transition-colors duration-300 ${
                    isOpen ? 'text-accent' : 'text-gray-400'
                  }`}
                />
              </div>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                  <div className="ml-0 sm:ml-[60px] pl-4 border-l-2 border-accent/30">
                    <p className="text-base sm:text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
