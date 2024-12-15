# **BestMovies**

Application web pour explorer et filtrer des films populaires.

---

## **À propos du projet**

- **Affichage dynamique** : Liste des films avec pagination.
- **Filtres avancés** : Par genre, année de production, et tri par note.
- **Interface utilisateur moderne** : Construite avec **Chakra UI** et **React Icons**.

---

## **Technologies utilisées**

- **Next.js** : Framework React pour le rendu côté serveur.
- **Chakra UI** : Composants accessibles et personnalisables.
- **Tailwind CSS** : Gestion des styles et responsive design.
- **TypeScript** : Typage fort pour un code robuste.
- **TMDb API** : Source de données pour les films.

---

## **Installation rapide**

1. **Cloner le projet** :
   ```bash
   git clone https://github.com/manda9988/bestmovies.git
   cd bestmovies
   ```
2. **Installer les dépendances** :
   ```bash
   npm install
   ```
3. **Configurer l’API TMDb** :  
   Crée un fichier `.env.local` avec :
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=VOTRE_CLÉ_API
   ```
4. **Démarrer le serveur local** :
   ```bash
   npm run dev
   ```
   Accéder au site : `http://localhost:3000`

---

## **Structure du projet**

- **`/src/app/components`** : Composants clés (MoviesList, FilterPanel, MovieCard).
- **`/src/utils`** : Fonctions pour récupérer et transformer les données.
- **`tailwind.config.ts`** : Configuration Tailwind pour le design.
- **`next.config.mjs`** : Optimisation des images et cache.

---

## **Auteur**

**Vincent Achy**  
[LinkedIn](https://www.linkedin.com/in/vincent-achy-1704421a9/) | [GitHub](https://github.com/manda9988)
