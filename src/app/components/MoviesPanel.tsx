// src/app/components/MoviesPanel.tsx

"use client"; // Ajout de la directive

import { useState, useEffect } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { movies } from "./moviesData";
import MovieCard from "./MovieCard";

export default function MoviesPanel() {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 3;

  // Calculer le début et la fin des films à afficher
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Fonction pour faire défiler la page vers le haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Fait défiler la page en douceur
    });
  };

  // Appelle la fonction scrollToTop chaque fois que la page change
  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  // Gestion du changement de page
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

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      mt="1"
      width={{ base: "95%", md: "60%" }}
      maxWidth="500px"
      mb="9"
    >
      {currentMovies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}

      {/* Pagination Buttons */}
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
