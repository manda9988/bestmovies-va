// src/utils/transformMovieData.ts

interface Movie {
  title: string;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[]; // Utilisation de l'objet genres
  overview: string;
  poster_path: string;
  credits?: {
    crew: { job: string; name: string }[];
    cast: { name: string }[];
  };
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
  const director =
    movie.credits?.crew.find((member) => member.job === "Director")?.name ||
    "N/A";
  const cast =
    movie.credits?.cast
      .slice(0, 4)
      .map((actor) => actor.name)
      .join(", ") || "N/A";

  // Vérification que 'genres' existe avant d'appeler 'map'
  const genres =
    movie.genres?.map((genre) => genre.name).join(", ") ||
    "Genres non disponibles";

  return {
    title: movie.title,
    releaseDate: movie.release_date,
    duration: movie.runtime ? `${movie.runtime} min` : `Durée non disponible`,
    genre: genres,
    director,
    cast,
    description: movie.overview,
    posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  };
}
