# Étude de Cas : Application de Compteur avec Docker

Ce projet est une étude de cas pour apprendre à dockeriser une application web composée d'un frontend et d'un backend. L'application est un simple compteur qui s'incrémente à chaque clic.

## Architecture du Projet

Le projet est composé de trois parties principales :

1. **Frontend** : Une application Next.js (React) qui affiche un compteur et un bouton pour l'incrémenter.
2. **Backend** : Une API Express.js qui gère la logique du compteur et se connecte à la base de données.
3. **Base de données** : PostgreSQL qui stocke l'état du compteur.

## Comment fonctionne l'application

1. L'utilisateur accède à l'interface web (frontend).
2. Lorsque l'utilisateur clique sur le bouton, le frontend envoie une requête à l'API backend.
3. Le backend reçoit la requête, incrémente le compteur dans la base de données PostgreSQL.
4. Le backend retourne la nouvelle valeur du compteur.
5. Le frontend met à jour l'affichage avec la nouvelle valeur.

## Objectif de l'étude de cas

Votre mission est de dockeriser cette application en créant :

1. Un Dockerfile pour le backend (Express.js)
2. Un Dockerfile pour le frontend (Next.js avec export statique)
3. Un fichier docker-compose.yml qui orchestre tout l'ensemble

## Exigences

1. **Pour le backend** :
   - Créer un Dockerfile qui permet de construire et exécuter l'API Express.js
   - Utiliser une image Node.js appropriée
   - S'assurer que toutes les dépendances sont installées
   - Exposer le port 3000

2. **Pour le frontend** :
   - Créer un Dockerfile qui construit l'application Next.js en mode statique
   - Configurer un serveur web pour servir les fichiers statiques
   - Exposer le port 80

3. **Pour Docker Compose** :
   - Orchestrer les services backend, frontend et base de données
   - Configurer PostgreSQL 14 (non exposé à l'extérieur)
   - Définir les variables d'environnement nécessaires
   - Configurer les volumes pour la persistance des données
   - Assurer que les services démarrent dans le bon ordre

## Ressources

Consultez les README dans les dossiers `frontend` et `backend` pour comprendre comment chaque partie de l'application fonctionne et comment les exécuter localement.

Pour plus d'informations sur Docker et Docker Compose, vous pouvez consulter :
- [Documentation officielle de Docker](https://docs.docker.com/)
- [Documentation de Docker Compose](https://docs.docker.com/compose/)
- [Guide sur les multi-stage builds](https://docs.docker.com/build/building/multi-stage/)

## Évaluation

Votre solution sera évaluée sur :
- La fonctionnalité : l'application doit fonctionner correctement dans l'environnement Docker
- L'optimisation : les images Docker doivent être optimisées (taille, sécurité)
- L'organisation : la structure des fichiers Docker doit être claire et bien documentée
- La configuration : la configuration de Docker Compose doit être correcte et complète