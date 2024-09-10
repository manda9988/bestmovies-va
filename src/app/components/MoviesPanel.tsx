// src/app/components/MoviesPanel.tsx

"use client"; // Ajout de la directive

import { useState, useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { movies } from "./moviesData";
import MovieCard from "./MovieCard";

export default function MoviesPanel() {
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null); // Nouveau state pour l'erreur
  const moviesPerPage = 3;

  useEffect(() => {
    if (!movies || movies.length === 0) {
      setError("Aucun film disponible pour le moment.");
    }
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const nextPage = () => {
    if (currentPage < Math.ceil(movies.length / moviesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
      {currentMovies.length > 0 ? (
        currentMovies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))
      ) : (
        <Text>Aucun film à afficher.</Text>
      )}

      <Flex justifyContent="space-between" mt="4">
        <Button onClick={prevPage} isDisabled={currentPage === 1} width="125px">
          Précédent
        </Button>
        <Button
          onClick={nextPage}
          isDisabled={currentPage === Math.ceil(movies.length / moviesPerPage)}
          width="125px"
        >
          Suivant
        </Button>
      </Flex>
    </Box>
  );
}
