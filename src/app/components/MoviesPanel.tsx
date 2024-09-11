// src/app/components/MoviesPanel.tsx

"use client"; // Ajout de la directive

import { useState, useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import MovieCard from "./MovieCard";

// Définir le type Movie
interface Movie {
  title: string;
  release_date: string;
  runtime: number;
  genre_ids: number[];
  overview: string;
  poster_path: string;
}

export default function MoviesPanel() {
  const [movies, setMovies] = useState<Movie[]>([]); // Définir le type Movie[]
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const moviesPerPage = 5; // Changer pour 5 films par page

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=8a4550f2878334d2012b924d74c5bb0c&page=${currentPage}&language=fr-FR&region=FR&include_adult=false`
        );
        const data = await response.json();
        setMovies(data.results.slice(0, moviesPerPage)); // Limite à 5 films
      } catch (error) {
        setError("Erreur lors du chargement des films.");
      }
    };

    fetchMovies();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
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
      {movies.length > 0 ? (
        movies.map((movie, index) => (
          <MovieCard
            key={index}
            movie={{
              title: movie.title,
              releaseDate: movie.release_date,
              duration: `Durée non disponible`, // L'API populaire ne renvoie pas la durée ici
              genre: movie.genre_ids.join(", "), // Adaptation pour les genres
              director: "N/A", // Non disponible dans cet endpoint
              cast: "N/A", // Non disponible dans cet endpoint
              description: movie.overview,
              posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
          />
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
          isDisabled={movies.length < moviesPerPage}
          width="125px"
        >
          Suivant
        </Button>
      </Flex>
    </Box>
  );
}
