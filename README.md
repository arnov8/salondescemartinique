# Salon des CSE & COS de Martinique

Site web officiel du **Salon des Comités Sociaux et Économiques (CSE) et Comités d'Œuvres Sociales (COS) de Martinique** — événement annuel organisé par Intersalon, réunissant exposants et responsables de comités d'entreprise en Martinique.

> 33ème édition — Jeudi 1er octobre 2026 — Palais des Congrès de Madiana (Schœlcher, Martinique)

---

## Description

Site vitrine et portail d'inscription de l'événement professionnel de référence pour les responsables CSE/COS en Martinique. Il permet :

- Aux **visiteurs** (secrétaires, présidents, trésoriers de CSE/COS) de s'inscrire gratuitement à l'événement.
- Aux **exposants** de déposer une pré-inscription et de signer un contrat de stand avec CGV intégrées.
- De gérer les formulaires de contact, d'exposition et d'inscription avec envoi d'emails automatiques (Resend) et enregistrement dans Google Sheets.

---

## Stack technique

| Technologie | Usage |
|---|---|
| **Next.js 16** (App Router) | Framework React fullstack |
| **TypeScript** | Typage statique |
| **Tailwind CSS v3** | Styles utilitaires |
| **React Hook Form + Zod** | Gestion et validation des formulaires |
| **Resend** | Envoi d'emails transactionnels |
| **Google Sheets API** | Stockage des soumissions de formulaires |
| **Cloudflare Turnstile** | Anti-spam CAPTCHA invisible |
| **html2pdf.js / jsPDF** | Génération de PDF côté client (contrat exposant) |
| **react-signature-canvas** | Signature électronique dans le formulaire exposant |
| **Lucide React** | Icônes |
| **Vercel** | Déploiement et hébergement |
| **Google Analytics (GA4)** | Mesure d'audience |

---

## Structure du projet

```
salondescemartinique/
├── app/
│   ├── page.tsx                      # Page d'accueil (hero, stats, secteurs, avantages)
│   ├── visiter/page.tsx              # Page visiteurs + formulaire d'inscription
│   ├── exposer/page.tsx              # Page exposants + formulaire de pré-inscription
│   ├── inscription-exposant/         # Formulaire complet d'inscription exposant (CGV + signature)
│   ├── contact/page.tsx              # Page de contact
│   ├── statut/page.tsx               # Page de suivi de statut d'inscription
│   ├── mentions-legales/
│   ├── politique-de-confidentialite/
│   ├── not-found.tsx                 # Page 404
│   ├── layout.tsx
│   ├── globals.css
│   └── api/
│       ├── contact/route.ts
│       ├── exhibitor/route.ts
│       ├── inscription/route.ts
│       ├── visitor/route.ts
│       ├── statut/route.ts
│       └── health/route.ts
├── components/
│   ├── Header.tsx / Footer.tsx
│   ├── PhotoCarousel.tsx             # Carrousel photos du salon
│   ├── YouTubeBackground.tsx         # Vidéo YouTube en fond du hero
│   ├── SignaturePad.tsx              # Signature électronique
│   ├── CGV.tsx / CGVPage1/2.tsx      # Conditions Générales de Vente
│   ├── FAQ.tsx
│   ├── ui/Turnstile.tsx
│   └── forms/
│       ├── ContactForm.tsx
│       ├── ExhibitorForm.tsx
│       ├── InscriptionForm.tsx
│       └── VisitorForm.tsx
├── lib/
│   ├── google-sheets.ts
│   ├── resend.ts
│   ├── rate-limit.ts
│   └── antispam.ts
├── public/
│   ├── images/
│   ├── videos/hero-background.mp4
│   └── docs/rib-antilles-salons.pdf
├── .env.example
├── next.config.mjs
└── tailwind.config.ts
```

---

## Installation et configuration

### Prérequis

- Node.js >= 18
- Compte [Resend](https://resend.com)
- Service Account Google (Google Sheets API)
- Widget [Cloudflare Turnstile](https://dash.cloudflare.com/)

### Étapes

```bash
git clone https://github.com/arnov8/salondescemartinique.git
cd salondescemartinique
npm install
cp .env.example .env.local
npm run dev
# Accessible sur http://localhost:3007
```

### Variables d'environnement

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Clé API Resend |
| `FROM_EMAIL` | Adresse d'expédition |
| `ADMIN_EMAIL` | Email de l'administrateur |
| `SHEET_ID` | ID de la Google Sheet |
| `GOOGLE_CREDENTIALS` | JSON du Service Account (sur une ligne) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Clé publique Cloudflare Turnstile |
| `TURNSTILE_SECRET_KEY` | Clé secrète Cloudflare Turnstile |

---

## Fonctionnalités clés

- **Page d'accueil** : hero avec vidéo de fond, statistiques clés (70 exposants, +700 visiteurs), secteurs représentés, galerie photo.
- **Inscription visiteur** : formulaire sécurisé Turnstile, email de confirmation, enregistrement Google Sheets.
- **Inscription exposant complète** : formulaire multi-étapes avec CGV sur 2 pages, double signature électronique, génération PDF du contrat, calcul automatique du prix HT/TTC selon les options (stands, logo, radio, emailing, sacs).
- **Anti-spam** : rate limiting par IP, Turnstile, détection heuristique, honeypot.
- **SEO** : métadonnées Open Graph, sitemap.xml, robots.txt.

---

## Déploiement

```bash
npx vercel --prod
```

Configurer les variables d'environnement dans le dashboard Vercel.
