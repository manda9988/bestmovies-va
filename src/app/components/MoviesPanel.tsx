// src/app/components/MoviesPanel.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@chakra-ui/react";
import { FilterPanel } from "./FilterPanel";
import MoviesContent from "./MoviesContent";
import { Genre } from "../../types";

interface MoviesPanelProps {
  currentPage: number;
  selectedYear: string;
  selectedGenre: string;
  genres: Genre[];
}

export default function MoviesPanel({
  currentPage,
  selectedYear,
  selectedGenre,
  genres,
}: MoviesPanelProps) {
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY ?? "";

  const [year, setYear] = useState<string>(selectedYear);
  const [genre, setGenre] = useState<string>(selectedGenre);
  const [page, setPage] = useState<number>(currentPage);

  useEffect(() => {
    setYear(selectedYear);
    setGenre(selectedGenre);
    setPage(currentPage);
    console.log(
      "Props updated. New page:",
      currentPage,
      "Year:",
      selectedYear,
      "Genre:",
      selectedGenre
    );
  }, [currentPage, selectedYear, selectedGenre]);

  const buildUrl = (page: number, year: string, genre: string) => {
    const params = new URLSearchParams({ page: page.toString() });
    if (year) params.append("year", year);
    if (genre) params.append("genre", genre);
    return `/?${params.toString()}`;
  };

  const handleYearChange = (yearRange: string | null) => {
    setYear(yearRange || "");
    console.log("Year changed to:", yearRange);
    const url = buildUrl(1, yearRange || "", genre);
    router.push(url);
    setPage(1);
    router.refresh();
  };

  const handleGenreChange = (genreId: string | null) => {
    setGenre(genreId || "");
    console.log("Genre changed to:", genreId);
    const url = buildUrl(1, year, genreId || "");
    router.push(url);
    setPage(1);
    router.refresh();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    console.log("Page changed to:", newPage);
    const url = buildUrl(newPage, year, genre);
    router.push(url);
    router.refresh();
  };

  return (
    <Box width="100%" mx="auto">
      <FilterPanel
        selectedYear={year}
        onYearChange={handleYearChange}
        selectedGenre={genre}
        onGenreChange={handleGenreChange}
        genres={genres}
      />
      <MoviesContent
        apiKey={apiKey}
        currentPage={page}
        selectedYear={year}
        selectedGenre={genre}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}
