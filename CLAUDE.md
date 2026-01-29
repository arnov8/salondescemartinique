# Salon des CSE & COS de Martinique - Site Vitrine

## Description du projet

Site vitrine moderne pour le **Salon des CSE & COS de Martinique** - 32ème édition.
Salon professionnel B2B dédié aux Comités Sociaux et Économiques (CSE) et Comités d'Œuvres Sociales (COS).

---

## Informations de l'événement

| Élément | Détail |
|---------|--------|
| **Nom** | Salon des CSE & COS de Martinique |
| **Édition** | 32ème édition |
| **Date** | Jeudi 2 Octobre 2025 |
| **Horaires** | 8h00 - 16h00 |
| **Lieu** | Palais des Congrès de Madiana, Schœlcher |
| **Entrée** | Gratuite sur inscription |

---

## Organisateur

| Élément | Détail |
|---------|--------|
| **Société** | Intersalon |
| **Gérante** | Françoise Valère |
| **Adresse** | CC de Bellevue, 97200 Fort-de-France |
| **Téléphone** | 05 96 61 21 21 |
| **Fax** | 05 96 61 93 44 |
| **Email** | intersaloncaraibe@yahoo.fr |

---

## Réseaux sociaux

- Instagram : https://www.instagram.com/salondescsemartinique/

---

## Chiffres clés

- **+60** exposants prestataires/fournisseurs
- **~700** visiteurs (responsables CSE/COS)
- **~200** CSE/COS représentés
- **32** années d'existence

---

## Structure des pages

| Page | Route | Description |
|------|-------|-------------|
| Accueil | `/` | Hero vidéo, infos clés, secteurs, chiffres |
| Visiter | `/visiter` | Contenu détaillé visiteurs + formulaire inscription |
| Exposer | `/exposer` | Contenu détaillé exposants + formulaire pré-inscription |
| Contact | `/contact` | Formulaire contact + localisation |
| 404 | `*` | Page d'erreur personnalisée |

---

## Contenu des pages

### Page Visiter (`/visiter`)
Sections détaillées :
- **Découvrez le rendez-vous incontournable** - Introduction au salon (32 ans d'existence)
- **Un événement conçu pour vous** - Date, lieu, +60 exposants
- **Faites-vous conseiller** - Comparer les offres, négocier directement
- **Les exposants que vous rencontrerez** - 15 secteurs d'activité listés
- **La Conférence CSE/COS** - Expert en droit du travail
- **La Grande Tombola des Comités** - Cadeaux à gagner (présence obligatoire)
- **Comment participer ?** - Processus en 3 étapes (inscription → badge → jour J)
- **Qui peut visiter ?** - Public cible + formulaire d'inscription

### Page Exposer (`/exposer`)
Sections détaillées :
- **Développez votre activité** - Introduction B2B
- **Une opportunité commerciale unique** - +700 visiteurs qualifiés
- **Qui sont les visiteurs ?** - Décideurs CSE/COS, budgets ASC
- **Les chiffres clés du salon** - 32 ans, +60 exposants, ~700 visiteurs, ~200 CSE
- **Les secteurs les plus recherchés** - 12 catégories de services
- **Visibilité médiatique** - RCI, presse locale, réseaux sociaux
- **Contact direct avec les décideurs** - Avantage du face-à-face
- **Ce qui est inclus** - Stand équipé + formulaire pré-inscription

---

## Formulaires

### 1. Formulaire Visiteur (`/visiter`)
- Nom & Prénom *
- Fonction/Poste *
- Entreprise/Organisation *
- Nom du CSE/COS *
- Email *
- Téléphone *
- Nombre de participants * (1-7)
- Champ honeypot (anti-spam, invisible)

### 2. Formulaire Exposant (`/exposer`)
- Nom de l'entreprise *
- Secteur d'activité *
- Nom du contact *
- Email *
- Téléphone *
- Adresse *
- Message/Besoins (optionnel)
- Champ honeypot (anti-spam, invisible)

### 3. Formulaire Contact (`/contact`)
- Nom *
- Email *
- Téléphone
- Sujet
- Message *
- Champ honeypot (anti-spam, invisible)

---

## Palette de couleurs

```css
--primary: #1e3a5f;        /* Bleu marine corporate */
--primary-dark: #152a45;   /* Bleu marine foncé */
--primary-light: #2a4d7a;  /* Bleu marine clair */
--accent: #d4a012;         /* Or/Doré */
--accent-light: #e5b523;   /* Or clair */
--white: #ffffff;
--gray-light: #f8fafc;
--gray: #6b7280;
--text: #1f2937;
```

---

## Stack technique

- **Framework** : Next.js 14+ (App Router)
- **Langage** : TypeScript (strict mode)
- **Styling** : Tailwind CSS 3.4
- **Formulaires** : React Hook Form + Zod (client & serveur)
- **Icônes** : Lucide React
- **Linting** : ESLint (next/core-web-vitals + next/typescript)
- **Emails** : Resend (notifications + confirmations)
- **Base de données** : Google Sheets (stockage formulaires)
- **Port dev** : 3002

---

## Commandes

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm run start

# Linting
npm run lint
```

---

## SEO & Métadonnées

### Fichiers SEO
- `robots.txt` - Directives pour les moteurs de recherche
- `sitemap.xml` - Plan du site (4 pages indexées)

### Métadonnées
- Balises Open Graph (Facebook, LinkedIn)
- Balises Twitter Card
- Favicon multi-résolution (16x16, 32x32, apple-touch-icon)

### Schema.org JSON-LD
Type `Event` avec :
- Nom, description, dates
- Lieu (Place avec adresse)
- Organisateur (Organization)
- Prix (gratuit sur inscription)
- Image et URL

---

## Sécurité API

### Validation
- Validation côté client avec Zod + React Hook Form
- Validation côté serveur avec Zod (schémas stricts)
- Limites de longueur sur tous les champs

### Rate Limiting
| Route | Limite | Fenêtre |
|-------|--------|---------|
| `/api/visitor` | 5 requêtes | 60 secondes |
| `/api/exhibitor` | 3 requêtes | 60 secondes |
| `/api/contact` | 5 requêtes | 60 secondes |

### Anti-spam
- Champs honeypot sur tous les formulaires
- Validation email stricte
- Blocage automatique avec header `Retry-After`

---

## Accessibilité

- Attributs `aria-label` sur tous les champs de formulaire
- Attributs `aria-invalid` sur les champs en erreur
- Attributs `aria-describedby` pour lier les erreurs aux champs
- Messages d'erreur explicites en français
- Navigation au clavier fonctionnelle
- Contraste des couleurs conforme WCAG

---

## Secteurs d'activité représentés

- Agences de voyage
- Chèques cadeaux & billetterie
- Animation & Spectacles
- Hôtellerie & hébergements
- Loisirs & Culture
- Conseil juridique & gestion
- Formation
- Assurance & Mutuelle
- Vins & Traiteurs
- Bien-être & Spa (Esthétique)
- Jouets & Enfants
- Banque & Services financiers
- Bureautique & Imprimerie
- Objets publicitaires
- Discothèques & Espaces de réception

---

## Public cible

### Visiteurs (EXCLUSIF)
- Responsables de CSE
- Membres du bureau CE
- Secrétaires de CSE
- Trésoriers de CSE
- Responsables COS

### Exposants
- Prestataires de services aux CE
- Fournisseurs d'avantages salariés
- Agences événementielles
- Professionnels du tourisme et loisirs

---

## Points forts du salon

1. **Conférence CSE/COS** - Animée par un expert en droit du travail
2. **Tombola des CE** - Cadeaux à gagner pour les visiteurs
3. **Contact privilégié** - Accès réservé aux décideurs CSE/COS
4. **Networking** - Échange entre responsables de comités

---

## Arborescence du projet

```
salon-cse-martinique/
├── app/
│   ├── layout.tsx            # Layout + métadonnées + JSON-LD
│   ├── page.tsx              # Accueil (hero vidéo)
│   ├── globals.css
│   ├── not-found.tsx         # Page 404 personnalisée
│   ├── visiter/
│   │   └── page.tsx
│   ├── exposer/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── api/
│       ├── visitor/route.ts   # + Zod + rate limit
│       ├── exhibitor/route.ts # + Zod + rate limit
│       └── contact/route.ts   # + Zod + rate limit
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── forms/
│       ├── VisitorForm.tsx    # + honeypot + aria
│       ├── ExhibitorForm.tsx  # + honeypot + aria
│       └── ContactForm.tsx    # + honeypot + aria
├── lib/
│   ├── rate-limit.ts          # Rate limiter in-memory
│   ├── resend.ts              # Configuration Resend emails
│   └── google-sheets.ts       # API Google Sheets
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── images/
│   │   ├── logo-blanc.png        # 54 Ko
│   │   ├── visuel-2025.jpg       # 307 Ko (optimisé)
│   │   ├── video-poster.jpg      # 234 Ko (optimisé)
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   └── apple-touch-icon.png
│   └── videos/
│       └── hero-background.mp4   # 20 Mo (optimisé CRF 23)
├── CLAUDE.md
├── package.json
├── .eslintrc.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

---

## Plan d'attaque - Étapes

| # | Étape | Statut |
|---|-------|--------|
| 1 | Création dossier + CLAUDE.md | ✅ Fait |
| 2 | Setup Next.js + Tailwind + Config | ✅ Fait |
| 3 | Layout (Header + Footer) | ✅ Fait |
| 4 | Page Accueil | ✅ Fait |
| 5 | Page Visiter + Formulaire | ✅ Fait |
| 6 | Page Exposer + Formulaire | ✅ Fait |
| 7 | Page Contact + Formulaire | ✅ Fait |
| 8 | API Routes (3 formulaires) | ✅ Fait |
| 9 | Installation dépendances | ✅ Fait |
| 10 | Récupération médias du site original | ✅ Fait |
| 11 | Vidéo en fond du hero avec overlay | ✅ Fait |
| 12 | Audit général (code, structure, perf) | ✅ Fait |
| 13 | Compression vidéo (22→20 Mo, CRF 23) | ✅ Fait |
| 14 | Optimisation images (PNG→JPG) | ✅ Fait |
| 15 | Création favicons multi-résolution | ✅ Fait |
| 16 | Ajout robots.txt + sitemap.xml | ✅ Fait |
| 17 | Métadonnées SEO + Schema.org JSON-LD | ✅ Fait |
| 18 | Page 404 personnalisée | ✅ Fait |
| 19 | Honeypot anti-spam sur formulaires | ✅ Fait |
| 20 | Validation Zod côté serveur | ✅ Fait |
| 21 | Rate limiting sur API routes | ✅ Fait |
| 22 | Attributs aria accessibilité | ✅ Fait |
| 23 | Configuration ESLint | ✅ Fait |
| 24 | Push sur GitHub | ✅ Fait |
| 25 | Déploiement Vercel | ✅ Fait |
| 26 | Cohérence SEO (titres H1, navigation) | ✅ Fait |
| 27 | Contenu détaillé page Visiter | ✅ Fait |
| 28 | Contenu détaillé page Exposer | ✅ Fait |

---

## Liens de production

| Service | URL |
|---------|-----|
| **Site Vercel** | https://salon-cse-martinique.vercel.app |
| **GitHub Repo** | https://github.com/arnov8/salondescemartinique |
| **Vercel Dashboard** | https://vercel.com/arnauds-projects-84fc44a0/salon-cse-martinique |

> Déploiement automatique activé : chaque push sur `main` déclenche un nouveau build.

---

## Médias intégrés

Les médias ont été récupérés depuis le site Wix original et optimisés :

| Fichier | Taille originale | Taille optimisée | Utilisation |
|---------|------------------|------------------|-------------|
| `logo-blanc.png` | 54 Ko | 54 Ko | Header, Footer |
| `visuel-2025.jpg` | 1.4 Mo (PNG) | 307 Ko | Section "Pourquoi visiter" |
| `hero-background.mp4` | 22 Mo | 20 Mo | Fond du hero |
| `video-poster.jpg` | 1.1 Mo | 234 Ko | Poster vidéo |

**Optimisations appliquées :**
- Vidéo : FFmpeg H.264 CRF 23 (qualité préservée)
- Images : Conversion PNG→JPG, qualité 85%

**Hero section** : La vidéo joue en fond avec un overlay bleu semi-transparent (`bg-primary/75`) et un dégradé pour améliorer la lisibilité du texte.

---

## Intégration Emails (Resend)

Chaque formulaire envoie :
1. **Email notification** → Admin (organisation@antillessalons.com)
2. **Email confirmation** → Visiteur/Exposant (avec badge ou récapitulatif)

### Variables d'environnement
```
RESEND_API_KEY=re_xxx
FROM_EMAIL=Salon des CSE Martinique <contact@salondescsemartinique.com>
ADMIN_EMAIL=organisation@antillessalons.com
```

> **Note** : Avant vérification du domaine, utiliser `FROM_EMAIL=onboarding@resend.dev`

---

## Intégration Google Sheets

Les données des formulaires sont stockées dans une Google Sheet avec 3 onglets :
- **Visiteurs** : Date | Nom | Fonction | Entreprise | CSE | Email | Téléphone
- **Exposants** : Date | Entreprise | Secteur | Contact | Email | Téléphone | Adresse | Message
- **Contact** : Date | Nom | Email | Téléphone | Sujet | Message

### Variables d'environnement
```
SHEET_ID=votre-sheet-id
GOOGLE_CREDENTIALS='{"type":"service_account",...}'
```

---

## Notes

- Site actuel : https://www.salondescemartinique.com (Wix)
- Entrée gratuite mais réservée aux membres CSE/COS
- URL production prévue : https://www.salondescsemartinique.com
- Déploiement : Vercel (auto-deploy sur push main)
