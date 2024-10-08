// src/utils/fetchMovieDetails.ts

import { Movie } from "../types"; // Import du type Movie

// Fonction pour récupérer les détails d'un film, y compris les crédits
export async function fetchMovieDetails(
  movieId: number,
  apiKey: string
): Promise<Movie> {
  const detailsResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr-FR`
  );
  if (!detailsResponse.ok) throw new Error("Failed to fetch movie details.");
  const detailsData = await detailsResponse.json();

  const creditsResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=fr-FR`
  );
  if (!creditsResponse.ok) throw new Error("Failed to fetch movie credits.");
  const creditsData = await creditsResponse.json();

  return { ...detailsData, credits: creditsData };
}
