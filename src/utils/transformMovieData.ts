// src/utils/transformMovieData.ts

interface Movie {
  title: string;
  release_date: string;
  runtime: number;
  genre_ids: number[];
  overview: string;
  poster_path: string;
}

interface TransformedMovie {
  title: string;
  releaseDate: string;
  duration: string;
  genre: string;
  director: string;
  cast: string;
  description: string;
  posterUrl: string;
}

export function transformMovieData(movie: Movie): TransformedMovie {
  return {
    title: movie.title,
    releaseDate: movie.release_date,
    duration: `Durée non disponible`,
    genre: movie.genre_ids.join(", "),
    director: "N/A",
    cast: "N/A",
    description: movie.overview,
    posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  };
}
