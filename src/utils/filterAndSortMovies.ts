// src/utils/filterAndSortMovies.ts

import { Movie, Country, Genre } from "../types";

const allowedCountries = ["US", "CN", "FR", "DE", "JP", "GB", "KR", "IT"];
const globalAverage = 6.5;

// Fonction pour filtrer et trier les films
export function filterAndSortMovies(movies: Movie[]): Movie[] {
  // Filtrer les films en fonction de certains critères, comme les films d'animation et les pays autorisés
  movies = movies.filter((movie: Movie) => {
    const movieCountries: string[] = movie.production_countries.map(
      (country: Country) => country.iso_3166_1
    );
    const isAllowedCountry = movieCountries.some((country: string) =>
      allowedCountries.includes(country)
    );
    const isAnimation = movie.genres.some(
      (genre: Genre) => genre.name === "Animation"
    );
    return isAllowedCountry && !isAnimation;
  });

  // Calculer la moyenne des votes pour rendre C dynamique
  const averageVoteCount =
    movies.reduce((sum, movie) => sum + movie.vote_count, 0) / movies.length;
  const C = averageVoteCount;

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
