// src/app/components/MoviesPanel.tsx

"use client";

import { Text } from "@chakra-ui/react";
import MoviesList from "./MoviesList";
import { transformMovieData } from "../../utils/transformMovieData";
import { fetchMovies } from "../../utils/fetchMovies";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
}

export default function MoviesPanel({ currentPage }: MoviesPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY ?? "";
  const [selectedYear, setSelectedYear] = useState<string>(
    searchParams.get("year") || ""
  );
  const [page, setPage] = useState<number>(currentPage || 1);

  const handleYearChange = (yearRange: string | string[]) => {
    const yearString = Array.isArray(yearRange) ? yearRange[0] : yearRange;
    setSelectedYear(yearString);
    router.push(`/?page=1&year=${yearString}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`/?page=${newPage}&year=${selectedYear}`);
  };

  return (
    <>
      <FilterPanel onYearChange={handleYearChange} />
      <MoviesContent
        apiKey={apiKey}
        currentPage={page}
        selectedYear={selectedYear}
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
        const result = await fetchMovies(apiKey, currentPage, selectedYear);
        setMovies(result.movies);
        setTotalPages(result.totalPages);
        setError(null); // Reset error
      } catch (e) {
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
        onPageChange={onPageChange} // Gère le changement de page
      />
    </>
  );
}
