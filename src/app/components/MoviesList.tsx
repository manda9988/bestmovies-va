// src/app/components/MoviesList.tsx

"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import CustomPagination from "./Pagination";

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
  currentPage: number;
  totalPages: number;
}

export default function MoviesList({
  movies,
  currentPage,
  totalPages,
}: MoviesListProps) {
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      mt="1"
      width={{ base: "94%", md: "60%" }}
      maxWidth="500px"
      mb="9"
    >
      {movies.length > 0 ? (
        movies.map((movie: Movie, index: number) => (
          <MovieCard key={index} movie={movie} />
        ))
      ) : (
        <Text>Aucun film à afficher.</Text>
      )}

      <Flex justifyContent="center" mt="6" alignItems="center">
        <CustomPagination currentPage={currentPage} totalPages={totalPages} />
      </Flex>
    </Box>
  );
}
