// src/app/components/MoviesContent.tsx

import { Text, Box } from "@chakra-ui/react"; // ← Importé Box
import MoviesList from "./MoviesList";
import CustomPagination from "./Pagination";
import { transformMovieData } from "../../utils/transformMovieData";
import { fetchMovies } from "../../utils/fetchMovies";
import { useState, useEffect } from "react";
import { Movie } from "../../types";

interface MoviesContentProps {
  apiKey: string;
  currentPage: number;
  selectedYear: string;
  selectedGenre: string;
  onPageChange: (page: number) => void;
}

export default function MoviesContent({
  apiKey,
  currentPage,
  selectedYear,
  selectedGenre,
  onPageChange,
}: MoviesContentProps) {
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadMovies() {
      try {
        const result = await fetchMovies(
          apiKey,
          currentPage,
          selectedYear,
          selectedGenre
        );

        setMovies(result.movies);
        setTotalPages(result.totalPages);
        setError(null);
      } catch (e) {
        console.error("Error fetching movies:", e);
        setError("Erreur lors du chargement des films.");
      }
    }

    if (apiKey) {
      loadMovies();
    }
  }, [apiKey, currentPage, selectedYear, selectedGenre]);

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  const transformedMovies = movies.map(transformMovieData);

  return (
    <Box width="100%" mx="auto">
      <MoviesList movies={transformedMovies} />
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Box>
  );
}
