# Lessons Learned — Salon des CSE & COS Martinique

## ⚠️ Erreur de dossier de déploiement (2026-06-01)

### Ce qui s'est passé
Il existe **deux dossiers** pour ce projet sur le Mac mini :
- `~/salondescemartinique/` ← **BON dossier** (lié à `salon-cse-martinique` sur Vercel, domaine custom)
- `~/Documents/Projects/salondescemartinique/` ← **MAUVAIS dossier** (lié à un projet Vercel fantôme `salondescemartinique`, sans domaine)

Les modifications ont été faites et déployées depuis le mauvais dossier. Les changements n'étaient pas visibles sur `salondescemartinique.com` car ils allaient sur un projet Vercel sans domaine custom.

### Comment détecter le problème
Vérifier dans `.vercel/project.json` que le `projectName` est bien **`salon-cse-martinique`** et non `salondescemartinique`.

### La règle absolue
**Toujours travailler depuis `~/salondescemartinique/`**

Si des modifications ont été faites depuis `Documents/Projects/` (et pushées sur GitHub), la correction est :
```bash
cd ~/salondescemartinique
git pull origin main
npx vercel --prod --yes
```

### Vérification rapide
```bash
cat ~/salondescemartinique/.vercel/project.json
# Doit afficher : "projectName":"salon-cse-martinique"
```

---

## ⚠️ Même piège sur le MacBook, et fusion GitHub ≠ mise en ligne (2026-10-07)

### Ce qui s'est passé
- Sur le MacBook (`avmbp`), la copie `/Users/avmbp/salondescemartinique/` datait de mars 2026 (26 commits de retard) et était liée au projet Vercel fantôme `salondescemartinique`. Elle a été renommée en `salondescemartinique.old-2026-10-07` et remplacée par un clone propre de `origin/main`, lié à `salon-cse-martinique`.
- L'intégration Git Vercel annule tous les déploiements (« Canceled by Ignored Build Step ») : fusionner une PR ne met rien en ligne. Le déploiement se fait uniquement via `npx vercel --prod --yes`.

### Règles
- `origin/main` est la seule référence. Toujours `git pull origin main` avant de travailler.
- Toujours vérifier `.vercel/project.json` → `"projectName":"salon-cse-martinique"`.
- Après une fusion sur GitHub, déployer explicitement (procédure dans CLAUDE.md).
- Sur le MacBook, exporter `DEVELOPER_DIR=/Library/Developer/CommandLineTools` avant git (licence Xcode non acceptée).
