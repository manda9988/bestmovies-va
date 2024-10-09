// src/app/components/MoviesList.tsx

"use client";

import { Box, Text } from "@chakra-ui/react";
import MovieCard from "./MovieCard";

interface Movie {
  title: string;
  releaseDate: string;
  duration: string;
  genre: string;
  director: string;
  cast: string;
  description: string;
  posterUrl: string;
}

interface MoviesListProps {
  movies: Movie[];
}

export default function MoviesList({ movies }: MoviesListProps) {
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      mt="1"
      width={{ base: "94%", md: "60%" }}
      maxWidth="500px"
      mx="auto" // ← Ajouté
      mb="9"
    >
      {movies.length > 0 ? (
        movies.map((movie: Movie, index: number) => (
          <MovieCard key={index} movie={movie} />
        ))
      ) : (
        <Text>Aucun film à afficher.</Text>
      )}
    </Box>
  );
}
