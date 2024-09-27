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
  production_countries: { iso_3166_1: string; name: string }[]; // Ajout des pays de production
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

    // Filtrer les films par pays de production
    movies = movies.filter((movie: Movie) => {
      const movieCountries = movie.production_countries.map(
        (country) => country.iso_3166_1
      );
      return movieCountries.some((country) =>
        allowedCountries.includes(country)
      );
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
