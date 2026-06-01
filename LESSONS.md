# Lessons Learned — Salon des CSE & COS Martinique

## ⚠️ Erreur de dossier de déploiement (2026-06-01)

### Ce qui s'est passé
Il existe **deux dossiers** pour ce projet sur la machine :
- `/Users/arnaudvalere/salondescemartinique/` ← **BON dossier** (lié à `salon-cse-martinique` sur Vercel, domaine custom)
- `/Users/arnaudvalere/Documents/Projects/salondescemartinique/` ← **MAUVAIS dossier** (lié à un projet Vercel fantôme `salondescemartinique`, sans domaine)

Les modifications ont été faites et déployées depuis le mauvais dossier. Les changements n'étaient pas visibles sur `salondescemartinique.com` car ils allaient sur un projet Vercel sans domaine custom.

### Comment détecter le problème
Vérifier dans `.vercel/project.json` que le `projectName` est bien **`salon-cse-martinique`** et non `salondescemartinique`.

### La règle absolue
**Toujours travailler depuis `/Users/arnaudvalere/salondescemartinique/`**

Si des modifications ont été faites depuis `Documents/Projects/` (et pushées sur GitHub), la correction est :
```bash
cd /Users/arnaudvalere/salondescemartinique
git pull origin main
npx vercel --prod
```

### Vérification rapide
```bash
cat /Users/arnaudvalere/salondescemartinique/.vercel/project.json
# Doit afficher : "projectName":"salon-cse-martinique"
```
