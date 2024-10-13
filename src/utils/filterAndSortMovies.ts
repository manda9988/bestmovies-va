// src/utils/filterAndSortMovies.ts

import { Movie, Country } from "../types";

const allowedCountries = ["US", "CN", "FR", "DE", "JP", "GB", "KR", "IT"];
const animationGenreId = 16; // ID du genre animation

// Fonction pour filtrer et trier les films
export function filterAndSortMovies(movies: Movie[]): Movie[] {
  // Filtrer les films en fonction des pays autorisés et exclure les films d'animation
  movies = movies.filter((movie: Movie) => {
    const movieCountries: string[] = movie.production_countries.map(
      (country: Country) => country.iso_3166_1
    );
    const isAllowedCountry = movieCountries.some((country: string) =>
      allowedCountries.includes(country)
    );

    // Exclure les films d'animation en vérifiant les IDs de genre dans movie.genres
    const isNotAnimation = !movie.genres.some(
      (genre) => genre.id === animationGenreId
    );

    return isAllowedCountry && isNotAnimation;
  });

  // Calculer la moyenne des votes pour rendre C dynamique
  const averageVoteCount =
    movies.reduce((sum, movie) => sum + movie.vote_count, 0) / movies.length;
  const C = averageVoteCount;

  // Calculer la moyenne des notes pour rendre globalAverage dynamique
  const globalAverage =
    movies.reduce((sum, movie) => sum + movie.vote_average, 0) / movies.length;

  // Calculer la note pondérée pour chaque film
  movies = movies.map((movie) => ({
    ...movie,
    weightedRating:
      (movie.vote_count / (movie.vote_count + C)) * movie.vote_average +
      (C / (movie.vote_count + C)) * globalAverage,
  }));

  // Trier les films par note pondérée
  movies = movies.sort(
    (a, b) => (b.weightedRating ?? 0) - (a.weightedRating ?? 0)
  );

  return movies;
}
