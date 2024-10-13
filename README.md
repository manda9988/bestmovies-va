Voici une version personnalisée et simplifiée de ton README pour **bestMoviesV2** :

---

# BestMoviesV2

BestMoviesV2 est une application web permettant de découvrir des films populaires, triés par genre, année, et classés par note moyenne pondérée. L'application utilise l'API de TMDb pour récupérer les films et propose une interface avec pagination et filtres dynamiques.

## Démarrage

Pour démarrer le serveur de développement :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ensuite, ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur pour voir le résultat.

## Fonctionnalités principales

- **Filtrage par genre et année**
- **Pagination dynamique**
- **Classement des films basé sur un système de notes pondérées**
- **Utilisation de l'API TMDb**

## Fichiers principaux

- `src/app/components/MoviesContent.tsx` : Gestion des films et de l'affichage.
- `src/utils/fetchMovies.ts` : Récupération des films avec tri et filtre.
- `src/app/components/Pagination.tsx` : Système de pagination.

---
