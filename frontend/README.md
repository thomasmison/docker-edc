# Frontend - Interface du Compteur

Ce dossier contient le frontend de l'application de compteur, développé avec Next.js et configuré pour générer un site statique.

## Architecture du Frontend

Le frontend est une application Next.js qui:
1. Affiche un compteur et un bouton pour l'incrémenter
2. Communique avec le backend pour récupérer et mettre à jour la valeur du compteur
3. Est généré comme un site statique (exporté dans le dossier `/out`)

## Technologies utilisées

- **Next.js**: Framework React pour le rendu côté serveur et les sites statiques
- **React**: Bibliothèque UI pour la création d'interfaces utilisateur
- **ShadCN/UI**: Bibliothèque de composants UI
- **Canvas Confetti**: Pour les effets d'animation lors du clic
- **Sonner**: Pour les notifications toast
- **Lucide React**: Pour les icônes

## Structure du projet

```
frontend/
├── app/                 # Dossier principal de l'application Next.js
│   ├── globals.css      # Styles globaux
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Page principale avec le compteur
├── components/          # Composants UI réutilisables
│   └── ui/              # Composants UI de ShadCN
├── hooks/               # Hooks personnalisés
│   └── useCounter.tsx   # Hook pour interagir avec l'API du compteur
├── next.config.js       # Configuration Next.js (avec export statique)
└── package.json         # Dépendances et scripts
```

## Configuration Next.js pour l'export statique

Le fichier `next.config.js` est configuré pour générer un site statique avec:

```javascript
const nextConfig = {
  output: 'export',         // Génère un export statique
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true }, // Nécessaire pour l'export statique avec les images
};
```

## Comment le Frontend interagit avec le Backend

Le frontend utilise un hook personnalisé `useCounter` pour interagir avec le backend:

1. Au chargement, il fait une requête GET à `/api/counter` pour récupérer la valeur actuelle
2. Quand l'utilisateur clique sur le bouton, il fait une requête PUT pour incrémenter le compteur
3. La communication avec le backend se fait via `fetch` à l'adresse `http://${window.location.hostname}:3000/api/counter`

Cela signifie que le frontend s'attend à ce que le backend soit accessible sur le même nom d'hôte (hostname) mais sur le port 3000.

## Comment exécuter localement

1. Installez les dépendances:
   ```bash
   npm install
   ```

2. Démarrez le serveur de développement:
   ```bash
   npm run dev
   ```
   Le serveur sera accessible à l'adresse http://localhost:3000

3. Pour construire le site statique:
   ```bash
   npm run build
   ```
   Cela générera les fichiers statiques dans le dossier `/out`

## Notes importantes

1. **Communication avec le Backend:**
   - Le frontend s'attend à ce que le backend soit accessible sur le port 3000
   - En développement local, cela fonctionne si le backend tourne sur http://localhost:3000

2. **Hébergement statique:**
   - Comme cette application est exportée statiquement, elle n'a pas besoin de Node.js en production
   - Vous pouvez utiliser n'importe quel serveur web pour servir les fichiers statiques
   - Cette approche est très performante et facile à mettre à l'échelle

## Exigences pour la dockerisation

Pour dockeriser ce frontend, vous devez:

1. Créer un Dockerfile qui:
   - Utilise une approche multi-étapes (multi-stage build):
     - Première étape: construire l'application Next.js avec `npm run build`
     - Deuxième étape: servir les fichiers statiques générés avec un serveur web léger
   - Expose le port 80 pour accéder à l'application

2. S'assurer que l'application peut communiquer avec le backend:
   - Le frontend appelle `http://${window.location.hostname}:3000/api/counter`
   - Configurer le réseau Docker pour que cette URL fonctionne
   - Alternativement, configurer un proxy pour rediriger les appels API

3. Optimiser l'image Docker:
   - Utiliser des images de base légères
   - Ne pas inclure les fichiers de développement dans l'image finale
   - Utiliser le caching des layers Docker efficacement