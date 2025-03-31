# Backend - API du Compteur

Ce dossier contient le backend de l'application de compteur, développé avec Express.js et connecté à une base de données PostgreSQL.

## Architecture du Backend

Le backend est une API REST simple qui:
1. Se connecte à une base de données PostgreSQL
2. Expose des endpoints pour lire et incrémenter un compteur
3. Vérifie que la version de PostgreSQL est bien 14.x
4. Initialise la base de données au démarrage si nécessaire

## Technologies utilisées

- **Express.js**: Framework web pour Node.js
- **PostgreSQL**: Base de données relationnelle
- **pg**: Client PostgreSQL pour Node.js
- **dotenv**: Pour gérer les variables d'environnement
- **cors**: Pour gérer les requêtes cross-origin
- **morgan**: Pour le logging des requêtes HTTP

## Structure du projet

```
backend/
├── src/
│   └── index.js      # Point d'entrée de l'application
├── package.json      # Dépendances et scripts
├── .env              # Variables d'environnement (production)
└── .env.example      # Exemple de variables d'environnement
```

## API Endpoints

- **GET /api/counter**: Retourne la valeur actuelle du compteur
- **PUT /api/counter**: Incrémente le compteur et retourne la nouvelle valeur

## Variables d'environnement

Le backend nécessite les variables d'environnement suivantes:

```
DATABASE_USER=username
DATABASE_PASSWORD=password
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=database_name
```

## Comment exécuter localement

1. Installez les dépendances:
   ```bash
   npm install
   ```

2. Créez un fichier `.env` basé sur `.env.example` et configurez vos variables d'environnement:
   ```bash
   cp .env.example .env
   ```

3. Assurez-vous que PostgreSQL est installé et en cours d'exécution

4. Démarrez le serveur:
   ```bash
   npm start
   ```

Le serveur sera accessible à l'adresse http://localhost:3000

## Comment interagir avec le Frontend

Le frontend envoie des requêtes HTTP à cette API pour:
1. Récupérer la valeur actuelle du compteur (GET /api/counter)
2. Incrémenter le compteur lorsque l'utilisateur clique sur le bouton (PUT /api/counter)

Lorsque le bouton est cliqué:
1. Le frontend envoie une requête PUT à http://<host>:3000/api/counter
2. Le backend reçoit cette requête et incrémente le compteur dans la base de données
3. Le backend renvoie la nouvelle valeur au frontend
4. Le frontend met à jour l'affichage avec cette nouvelle valeur

## Interaction avec la base de données

Au démarrage, le backend:
1. Se connecte à PostgreSQL
2. Vérifie que la version de PostgreSQL est 14.x
3. Crée la table "count" si elle n'existe pas
4. Initialise le compteur à 0 si aucune valeur n'existe

## Exigences pour la dockerisation

Pour dockeriser ce backend, vous devez:

1. Créer un Dockerfile qui:
   - Utilise une image Node.js appropriée
   - Installe les dépendances nécessaires
   - Copie le code source
   - Expose le port 3000
   - Démarre l'application avec la commande appropriée

2. Définir les variables d'environnement pour la connexion à PostgreSQL:
   - Le nom d'hôte de la base de données doit correspondre au service PostgreSQL dans Docker Compose
   - Les identifiants et mot de passe doivent être configurés correctement
   
3. S'assurer que le backend attend que PostgreSQL soit prêt avant de démarrer

4. Configurer correctement les dépendances entre les services dans Docker Compose