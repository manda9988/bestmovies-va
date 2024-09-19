// src/app/components/MoviesPanel.tsx

import { Text } from "@chakra-ui/react";
import MoviesList from "./MoviesList";

interface Movie {
  title: string;
  release_date: string;
  runtime: number;
  genre_ids: number[];
  overview: string;
  poster_path: string;
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

  const moviesPerPage = 5;
  let movies: Movie[] = [];
  let error = null;
  let totalPages = 1;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&region=FR&include_adult=false`,
      { next: { revalidate: 3600 } }
    );
    const data = await response.json();
    totalPages = data.total_pages;
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    movies = data.results.slice(startIndex, endIndex);
  } catch {
    error = "Erreur lors du chargement des films.";
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  // Transformer les données pour correspondre au format attendu par MoviesList
  const transformedMovies = movies.map((movie) => ({
    title: movie.title,
    releaseDate: movie.release_date,
    duration: `Durée non disponible`,
    genre: movie.genre_ids.join(", "),
    director: "N/A",
    cast: "N/A",
    description: movie.overview,
    posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  }));

  return (
    <MoviesList
      movies={transformedMovies}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
