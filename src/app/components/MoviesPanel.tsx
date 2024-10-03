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
import { Genre } from "../../types"; // Import du type Genre

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
  vote_count: number; // Assurez-vous que ces propriétés sont ajoutées
  vote_average: number;
  weightedRating?: number;
}

interface MoviesPanelProps {
  currentPage: number;
  selectedYear: string;
  selectedGenre: string; // Nouvel état pour le genre
  genres: Genre[]; // Liste des genres disponibles
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

  const handleYearChange = (yearRange: string | null) => {
    if (yearRange) {
      setYear(yearRange);
      console.log("Year changed to:", yearRange);
      let url = `/?page=1&year=${yearRange}`;
      if (genre) {
        url += `&genre=${genre}`;
      }
      router.push(url);
    } else {
      setYear("");
      console.log("Year cleared");
      let url = `/?page=1`;
      if (genre) {
        url += `&genre=${genre}`;
      }
      router.push(url);
    }
    setPage(1);
    router.refresh();
  };

  const handleGenreChange = (genreId: string | null) => {
    if (genreId) {
      setGenre(genreId);
      console.log("Genre changed to:", genreId);
      let url = `/?page=1&year=${year}`;
      url += `&genre=${genreId}`;
      router.push(url);
    } else {
      setGenre("");
      console.log("Genre cleared");
      let url = `/?page=1&year=${year}`;
      router.push(url);
    }
    setPage(1);
    router.refresh();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    console.log("Page changed to:", newPage);
    let url = `/?page=${newPage}`;
    if (year) url += `&year=${year}`;
    if (genre) url += `&genre=${genre}`;
    router.push(url);
    router.refresh();
  };

  return (
    <>
      <FilterPanel
        selectedYear={year}
        onYearChange={handleYearChange}
        selectedGenre={genre}
        onGenreChange={handleGenreChange}
        genres={genres} // Passer la liste des genres
      />
      <MoviesContent
        apiKey={apiKey}
        currentPage={page}
        selectedYear={year}
        selectedGenre={genre} // Passer le genre sélectionné
        onPageChange={handlePageChange}
      />
    </>
  );
}

function MoviesContent({
  apiKey,
  currentPage,
  selectedYear,
  selectedGenre,
  onPageChange,
}: {
  apiKey: string;
  currentPage: number;
  selectedYear: string;
  selectedGenre: string;
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
          selectedYear,
          "Genre:",
          selectedGenre
        );
        const result = await fetchMovies(
          apiKey,
          currentPage,
          selectedYear,
          selectedGenre
        );
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
  }, [apiKey, currentPage, selectedYear, selectedGenre]);

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
