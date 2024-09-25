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

  const moviesPerPage = 5;
  let movies: Movie[] = [];
  let error = null;
  let totalPages = 1;

  try {
    // Récupérer la page actuelle de films populaires
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&region=FR&include_adult=false&page=${currentPage}`
    );
    const data = await response.json();

    // Utiliser total_pages de l'API et limiter à 500 pages maximum
    totalPages = Math.min(data.total_pages, 500);

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
      totalPages={totalPages} // Passe le bon nombre de pages à la pagination
    />
  );
}
