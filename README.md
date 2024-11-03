# BestMovies

BestMovies est une application web permettant de découvrir des films populaires, triés par genre, année, et classés par note moyenne pondérée. L'application utilise l'API de TMDb pour récupérer les films et propose une interface avec pagination et filtres dynamiques.

## Prérequis

Avant de commencer, assure-toi d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Installation

Clone le repository et installe les dépendances :

```bash
git clone https://github.com/ton-projet/bestmoviesv2.git
cd bestmoviesv2
npm install
```

## Démarrage

Pour démarrer le serveur de développement :

```bash
npm run dev
```

Ensuite, ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur pour voir l'application.

## Fonctionnalités principales

- **Filtrage par genre et année** : Sélectionne un genre ou une année pour filtrer les films.
- **Pagination dynamique** : Navigue facilement entre les pages de films.
- **Classement des films** : Les films sont classés en fonction d'un système de notes pondérées, basé sur la moyenne des votes avec un minimum de 3000 votes.
- **Utilisation de l'API TMDb** : Les données de films sont récupérées via l'API de [The Movie Database (TMDb)](https://www.themoviedb.org/).

## Fichiers principaux

- `src/app/components/MoviesContent.tsx` : Composant principal pour la gestion des films et de leur affichage.
- `src/utils/fetchMovies.ts` : Fonction pour récupérer les films avec tri et filtres basés sur les genres, les années, et les notes.
- `src/app/components/Pagination.tsx` : Composant pour gérer la pagination dynamique.
- `src/utils/filterAndSortMovies.ts` : Fonction utilitaire pour filtrer et trier les films avant affichage.

## Scripts disponibles

Dans ce projet, tu peux exécuter les scripts suivants :

- `npm run dev` : Lance le serveur en mode développement.
- `npm run build` : Compile l'application pour la production.
- `npm run start` : Démarre l'application en mode production.
- `npm run lint` : Exécute l'analyseur de code pour s'assurer que le code respecte les standards.

## Technologies utilisées

- **Next.js** : Framework React pour le rendu côté serveur.
- **Chakra UI** : Librairie de composants pour la mise en forme de l'interface utilisateur.
- **TypeScript** : Superset de JavaScript typé pour améliorer la robustesse du code.
- **Framer Motion** : Utilisé pour les animations.

## API

L'application utilise l'API TMDb pour récupérer les données de films. Tu peux obtenir une clé API en t'inscrivant sur [TMDb](https://www.themoviedb.org/signup).

## Comment contribuer

1. Fork le projet
2. Crée une nouvelle branche (`git checkout -b feature/ma-nouvelle-fonctionnalité`)
3. Fais tes modifications (`git commit -m 'Ajout de ma nouvelle fonctionnalité'`)
4. Pousse la branche (`git push origin feature/ma-nouvelle-fonctionnalité`)
5. Ouvre une Pull Request

---
