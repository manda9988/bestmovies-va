// src/utils/fetchGenres.ts

import { Genre } from "../types";

export async function fetchGenres(apiKey: string): Promise<Genre[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=fr-FR`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch genres.");
  }

  const data = await response.json();
  return data.genres;
}
