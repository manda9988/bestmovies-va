// src/app/components/MoviesPanel.tsx

"use client";

import { Text } from "@chakra-ui/react";
import MoviesList from "./MoviesList";
import { transformMovieData } from "../../utils/transformMovieData";
import { fetchMovies } from "../../utils/fetchMovies";
import { useState, useEffect } from "react";
import { FilterPanel } from "./FilterPanel";

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

export default function MoviesPanel({ currentPage }: MoviesPanelProps) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY ?? "";
  const [selectedYear, setSelectedYear] = useState<string>("");

  const handleYearChange = (yearRange: string | string[]) => {
    const yearString = Array.isArray(yearRange) ? yearRange[0] : yearRange;
    console.log("Selected Year Range:", yearString);
    setSelectedYear(yearString);
  };

  return (
    <>
      <FilterPanel onYearChange={handleYearChange} />
      <MoviesContent
        apiKey={apiKey}
        currentPage={currentPage}
        selectedYear={selectedYear}
      />
    </>
  );
}

function MoviesContent({
  apiKey,
  currentPage,
  selectedYear,
}: {
  apiKey: string;
  currentPage: number;
  selectedYear: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadMovies() {
      try {
        console.log("Fetching movies with:", {
          apiKey,
          currentPage,
          selectedYear,
        });
        const result = await fetchMovies(apiKey, currentPage, selectedYear);
        if (result.movies.length === 0) {
          console.log("No movies found for this period.");
          setError("Aucun film trouvé pour cette période.");
        } else {
          console.log("Movies fetched successfully:", result.movies);
          setMovies(result.movies);
          setTotalPages(result.totalPages);
          setError(null); // Reset error
        }
      } catch (e) {
        console.error("Error loading movies:", e);
        setError("Erreur lors du chargement des films.");
      }
    }

    if (apiKey) {
      loadMovies();
    }
  }, [apiKey, currentPage, selectedYear]);

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  const transformedMovies = movies.map(transformMovieData);

  return (
    <MoviesList
      movies={transformedMovies}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
