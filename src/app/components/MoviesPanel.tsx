// src/app/components/MoviesPanel.tsx

import { Text } from "@chakra-ui/react";
import MoviesList from "./MoviesList";
import { transformMovieData } from "../../utils/transformMovieData";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  runtime: number | null;
  genres: { id: number; name: string }[];
  overview: string;
  poster_path: string;
  production_countries: { iso_3166_1: string; name: string }[];
  vote_average: number;
  vote_count: number;
  weightedRating?: number; // Ajout de la propriété weightedRating
  credits?: {
    crew: { job: string; name: string }[];
    cast: { name: string }[];
  };
}

interface MoviesPanelProps {
  currentPage: number;
}

export default async function MoviesPanel({ currentPage }: MoviesPanelProps) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if (!apiKey) {
    return (
      <Text color="red.500">
        Clé API non définie. Veuillez vérifier votre configuration.
      </Text>
    );
  }

  let movies: Movie[] = [];
  let error = null;
  let totalPages = 1;

  // Liste des pays principaux
  const allowedCountries = ["US", "CN", "FR", "DE", "JP", "GB", "KR", "IT"];

  // Paramètres pour le calcul bayésien
  const C = 3000;
  const globalAverage = 6.5;

  try {
    // Récupérer les films de la page actuelle
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&include_adult=false&sort_by=vote_average.desc&vote_count.gte=3000&page=${currentPage}`
    );
    const data = await response.json();

    // Utiliser total_pages de l'API et limiter à 500 pages maximum
    totalPages = Math.min(data.total_pages, 500);

    // Récupérer les détails et crédits pour chaque film
    const movieDetailsPromises = data.results.map(async (movie: Movie) => {
      const detailsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=fr-FR`
      );
      const detailsData = await detailsResponse.json();

      const creditsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}&language=fr-FR`
      );
      const creditsData = await creditsResponse.json();

      return { ...detailsData, credits: creditsData };
    });

    movies = await Promise.all(movieDetailsPromises);

    // Filtrer les films par pays de production et exclure les films d'animation
    movies = movies.filter((movie: Movie) => {
      const movieCountries = movie.production_countries.map(
        (country) => country.iso_3166_1
      );
      const isAllowedCountry = movieCountries.some((country) =>
        allowedCountries.includes(country)
      );
      const isAnimation = movie.genres.some(
        (genre) => genre.name === "Animation"
      );
      return isAllowedCountry && !isAnimation;
    });

    // Calculer la note pondérée pour chaque film
    movies = movies.map((movie) => {
      const weightedRating =
        (movie.vote_count / (movie.vote_count + C)) * movie.vote_average +
        (C / (movie.vote_count + C)) * globalAverage;
      return { ...movie, weightedRating };
    });

    // Trier les films par la note pondérée en gérant les valeurs indéfinies
    movies = movies.sort((a, b) => {
      const ratingA = a.weightedRating ?? 0;
      const ratingB = b.weightedRating ?? 0;
      return ratingB - ratingA;
    });
  } catch {
    error = "Erreur lors du chargement des films.";
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  const transformedMovies = movies.map(transformMovieData);

  return (
    <MoviesList
      movies={transformedMovies}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
