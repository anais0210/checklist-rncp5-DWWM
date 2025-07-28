# Checklist RNCP5 DWWM

Ce projet est une checklist pour le RNCP5 DWWM. Il permet de suivre et v1lider les différentes étapes du parcours.

## ✨ Fonctionnalités

- 📋 **Checklist interactive** avec suivi de progression en temps réel
- 🔍 **Recherche** dans les descriptions et notes
- 📝 **Notes personnalisées** pour chaque élément
- 📊 **Export Excel** de votre progression
- 💾 **Sauvegarde automatique** dans le navigateur
- 🔄 **Réinitialisation** sélective ou totale
- 📱 **Interface responsive** et accessible

## 🛠️ Technologies

- **Frontend** : HTML5, CSS3, TypeScript
- **Build** : TypeScript Compiler (tsc)
- **Serveur de dev** : http-server
- **Linting** : HTMLHint, Stylelint, TypeScript
- **Déploiement** : Vercel

## 📁 Structure du projet

```
checklist-rncp5-DWWM/
├── js/                    # Fichiers source TypeScript
│   ├── app.ts            # Application principale
│   ├── progress.ts       # Gestion de la progression
│   ├── search-manager.ts # Gestion de la recherche
│   ├── export.ts         # Export Excel
│   └── ...               # Autres modules
├── dist/                 # Fichiers JavaScript compilés (généré)
├── index.html            # Page principale
├── styles.css            # Styles CSS
├── package.json          # Dépendances et scripts
├── tsconfig.json         # Configuration TypeScript
└── vercel.json           # Configuration de déploiement
```

## 🚀 Installation

1. **Clonez le dépôt :**
   ```bash
   git clone https://github.com/anais0210/checklist-rncp5-DWWM.git
   cd checklist-rncp5-DWWM
   ```

2. **Installez les dépendances :**
   ```bash
   npm install
   ```

## 💻 Développement

### Démarrage rapide

```bash
# Compiler TypeScript et lancer le serveur de développement
npm run build
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript et corrige les imports |
| `npm run dev` | Lance le serveur de développement (sans cache) |
| `npm run start` | Lance le serveur de production |
| `npm run build:watch` | Compilation TypeScript en mode watch |
| `npm run lint` | Exécute tous les linters |
| `npm run lint:html` | Lint HTML avec HTMLHint |
| `npm run lint:css` | Lint CSS avec Stylelint |
| `npm run lint:ts` | Vérification TypeScript |
| `npm run test:a11y` | Exécute les tests d'accessibilité |

### Workflow de développement

1. **Modifiez les fichiers source** dans `js/` (fichiers `.ts`)
2. **Compilez** avec `npm run build`
3. **Testez** avec `npm run dev`
4. **Lintez** avec `npm run lint`

## 🧪 Tests d'accessibilité

Le projet inclut des tests d'accessibilité automatisés utilisant Playwright et axe-core pour garantir la conformité aux standards WCAG 2.0/2.1 AA.

### Lancer les tests

```bash
# Installation des navigateurs (première fois uniquement)
npx playwright install

# Exécuter les tests d'accessibilité
npm run test:a11y
```

### Fonctionnement

Le script de test :
1. **Lance un serveur local** sur `http://localhost:3000`
2. **Ouvre la page** avec Playwright (Chromium)
3. **Analyse l'accessibilité** avec les règles WCAG 2.0/2.1 AA
4. **Rapporte les violations** détaillées si trouvées

### Résultats

- ✅ **Succès** : "Aucune violation d'accessibilité trouvée"
- ❌ **Échec** : Liste détaillée avec :
  - Règle violée et impact
  - Description du problème
  - Éléments concernés
  - Conseils de correction

### Standards testés

- WCAG 2.0 A & AA
- WCAG 2.1 A & AA
- Bonnes pratiques d'accessibilité

## 🔍 Linting

Le projet utilise une configuration de linting stricte :

- **HTMLHint** pour le HTML
- **Stylelint** pour le CSS (standard config)
- **TypeScript** pour la vérification de types

Configuration dans :
- `.htmlhintrc` (HTML)
- `.stylelintrc.json` (CSS)
- `tsconfig.json` (TypeScript)

## 🚀 Déploiement

### Vercel 

Le projet est configuré pour Vercel avec `vercel.json` :

1. **Build automatique** : `npm run build`
2. **Output directory** : `.` (racine)
3. **Cache optimisé** pour les fichiers statique

## 🌐 Fonctionnalités de l'application

### Suivi de progression
- Barre de progression dynamique
- Calcul automatique des pourcentages
- Sauvegarde automatique de l'état

### Recherche
- Recherche dans les descriptions
- Recherche dans les notes personnelles
- Mise en évidence des résultats

### Export de données
- Export Excel complet
- Format compatible avec Excel/LibreOffice

### Gestion des données
- Sauvegarde locale (localStorage)
- Réinitialisation sélective

## 🔧 Configuration

### TypeScript

### Serveur de développement

Configuration `http-server` :
- Port : 3000
- CORS : Activé
- Cache : Désactivé en mode dev

##  Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Pushez vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence ISC.

##  Support

Pour toute question ou problème :
1. Vérifiez les [Issues existantes](https://github.com/anais0210/checklist-rncp5-DWWM/issues)
2. Créez une nouvelle issue si nécessaire
3. Consultez la documentation TypeScript si problème de compilation
