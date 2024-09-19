// src/app/components/MoviesList.tsx

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import Link from "next/link";

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
      width="100%"
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

      <Flex justifyContent="space-between" mt="4" alignItems="center">
        {/* Bouton Précédent */}
        {currentPage > 1 ? (
          <Link href={`/?page=${currentPage - 1}`} passHref>
            <Button width="125px">Précédent</Button>
          </Link>
        ) : (
          <Button width="125px" isDisabled>
            Précédent
          </Button>
        )}

        {/* Composant Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} />

        {/* Bouton Suivant */}
        {currentPage < totalPages ? (
          <Link href={`/?page=${currentPage + 1}`} passHref>
            <Button width="125px">Suivant</Button>
          </Link>
        ) : (
          <Button width="125px" isDisabled>
            Suivant
          </Button>
        )}
      </Flex>
    </Box>
  );
}
