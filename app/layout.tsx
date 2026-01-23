import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Salon des CSE & COS de Martinique 2025 | 32ème Édition',
  description: 'Le rendez-vous annuel des responsables de Comités Sociaux et Économiques (CSE) et Comités d\'Œuvres Sociales (COS) en Martinique. 2 Octobre 2025 au Palais des Congrès de Madiana.',
  keywords: ['salon', 'CSE', 'COS', 'Martinique', 'comité entreprise', 'CE', 'professionnel', '2025', 'Schœlcher', 'Madiana'],
  authors: [{ name: 'Intersalon' }],
  creator: 'Intersalon',
  publisher: 'Intersalon',
  metadataBase: new URL('https://www.salondescsemartinique.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Salon des CSE & COS de Martinique 2025 | 32ème Édition',
    description: 'Le rendez-vous annuel des responsables CSE & COS en Martinique. Jeudi 2 Octobre 2025 au Palais des Congrès de Madiana.',
    url: 'https://www.salondescsemartinique.com',
    siteName: 'Salon des CSE & COS de Martinique',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/visuel-2025.jpg',
        width: 1200,
        height: 630,
        alt: 'Salon des CSE & COS de Martinique 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salon des CSE & COS de Martinique 2025',
    description: 'Le rendez-vous annuel des responsables CSE & COS en Martinique.',
    images: ['/images/visuel-2025.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Schema.org JSON-LD for Event
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Salon des CSE & COS de Martinique 2025 - 32ème Édition',
  description: 'Le rendez-vous annuel des responsables de Comités Sociaux et Économiques (CSE) et Comités d\'Œuvres Sociales (COS) en Martinique.',
  startDate: '2025-10-02T08:00:00+04:00',
  endDate: '2025-10-02T16:00:00+04:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Palais des Congrès de Madiana',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Palais des Congrès de Madiana',
      addressLocality: 'Schœlcher',
      postalCode: '97233',
      addressCountry: 'MQ',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Intersalon',
    url: 'https://www.salondescsemartinique.com',
    telephone: '+596596612121',
    email: 'intersaloncaraibe@yahoo.fr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'CC de Bellevue',
      addressLocality: 'Fort-de-France',
      postalCode: '97200',
      addressCountry: 'MQ',
    },
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: 'https://www.salondescsemartinique.com/visiter',
    validFrom: '2025-01-01',
  },
  image: 'https://www.salondescsemartinique.com/images/visuel-2025.jpg',
  isAccessibleForFree: true,
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Membres de CSE et COS',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
