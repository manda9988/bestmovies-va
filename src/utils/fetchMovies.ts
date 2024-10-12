// src/utils/fetchMovies.ts

import { Movie } from "../types";
import { fetchMovieDetails } from "./fetchMovieDetails"; // Import de la fonction existante
import { filterAndSortMovies } from "./filterAndSortMovies"; // Import de la nouvelle fonction

// Fonction pour récupérer la liste des films
export async function fetchMovies(
  apiKey: string,
  currentPage: number,
  selectedYear: string = "",
  selectedGenre: string = ""
): Promise<{ movies: Movie[]; totalPages: number }> {
  let dateRange = "";

  if (selectedYear) {
    const [startYear, endYear] = selectedYear.split("-");
    if (startYear && endYear) {
      dateRange = `&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
    } else {
      throw new Error("Invalid date range.");
    }
  }

  let genreFilter = "";
  if (selectedGenre) {
    genreFilter = `&with_genres=${selectedGenre}`;
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&include_adult=false&sort_by=vote_average.desc&vote_count.gte=2000&page=${currentPage}${dateRange}${genreFilter}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies.");
  }

  const data = await response.json();
  console.log("Movies fetched from API:", data);

  const totalPages = Math.min(data.total_pages, 500);

  // Récupérer les détails de chaque film
  const movieDetailsPromises: Promise<Movie>[] = data.results.map(
    (movie: Movie) => fetchMovieDetails(movie.id, apiKey)
  );

  let movies = await Promise.all(movieDetailsPromises);

  // Filtrer et trier les films
  movies = filterAndSortMovies(movies);

  return { movies, totalPages };
}
