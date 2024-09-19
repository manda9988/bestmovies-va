// src/app/components/MoviesPanel.tsx

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import Link from "next/link";

// Définir le type Movie
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

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${currentPage}&language=fr-FR&region=FR&include_adult=false`,
      { next: { revalidate: 3600 } } // Met en cache la réponse pendant 1 heure
    );
    const data = await response.json();
    movies = data.results.slice(0, moviesPerPage);
  } catch {
    error = "Erreur lors du chargement des films.";
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      mt="1"
      width="100%"
      maxWidth="500px"
      mb="9"
    >
      {movies.length > 0 ? (
        movies.map((movie, index) => (
          <MovieCard
            key={index}
            movie={{
              title: movie.title,
              releaseDate: movie.release_date,
              duration: `Durée non disponible`,
              genre: movie.genre_ids.join(", "),
              director: "N/A",
              cast: "N/A",
              description: movie.overview,
              posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
          />
        ))
      ) : (
        <Text>Aucun film à afficher.</Text>
      )}

      <Flex justifyContent="space-between" mt="4">
        {currentPage > 1 ? (
          <Link href={`/?page=${currentPage - 1}`} passHref>
            <Button width="125px">Précédent</Button>
          </Link>
        ) : (
          <Button width="125px" isDisabled>
            Précédent
          </Button>
        )}
        <Link href={`/?page=${currentPage + 1}`} passHref>
          <Button width="125px">Suivant</Button>
        </Link>
      </Flex>
    </Box>
  );
}
