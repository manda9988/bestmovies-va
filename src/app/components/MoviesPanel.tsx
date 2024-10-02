// src/app/components/MoviesPanel.tsx

"use client";

import { Text } from "@chakra-ui/react";
import MoviesList from "./MoviesList";
import { transformMovieData } from "../../utils/transformMovieData";
import { fetchMovies } from "../../utils/fetchMovies";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomPagination from "./Pagination";
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
  selectedYear: string;
}

export default function MoviesPanel({
  currentPage,
  selectedYear,
}: MoviesPanelProps) {
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY ?? "";

  const [year, setYear] = useState<string>(selectedYear);
  const [page, setPage] = useState<number>(currentPage);

  useEffect(() => {
    setYear(selectedYear);
    setPage(currentPage);
    console.log("Props updated. New page:", currentPage, "Year:", selectedYear);
  }, [currentPage, selectedYear]);

  const handleYearChange = (yearRange: string | null) => {
    if (yearRange) {
      setYear(yearRange);
      console.log("Year changed to:", yearRange);
      router.push(`/?page=1&year=${yearRange}`);
    } else {
      setYear(""); // Réinitialise l'année
      console.log("Year cleared");
      router.push(`/?page=1`); // Retire le paramètre 'year' de l'URL
    }
    setPage(1);
    router.refresh(); // Forcer le re-rendu
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    console.log("Page changed to:", newPage);
    if (year) {
      router.push(`/?page=${newPage}&year=${year}`);
    } else {
      router.push(`/?page=${newPage}`);
    }
    router.refresh(); // Forcer le re-rendu
  };

  return (
    <>
      <FilterPanel selectedYear={year} onYearChange={handleYearChange} />
      <MoviesContent
        apiKey={apiKey}
        currentPage={page}
        selectedYear={year}
        onPageChange={handlePageChange}
      />
    </>
  );
}

function MoviesContent({
  apiKey,
  currentPage,
  selectedYear,
  onPageChange,
}: {
  apiKey: string;
  currentPage: number;
  selectedYear: string;
  onPageChange: (page: number) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadMovies() {
      try {
        console.log(
          "Fetching movies for page:",
          currentPage,
          "Year:",
          selectedYear
        );
        const result = await fetchMovies(apiKey, currentPage, selectedYear);
        console.log("Movies fetched successfully:", result.movies);
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
  }, [apiKey, currentPage, selectedYear]);

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  const transformedMovies = movies.map(transformMovieData);

  return (
    <>
      <MoviesList movies={transformedMovies} />
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}
