// src/utils/fetchMovies.ts

interface Movie {
  id: number;
  title: string;
  release_date: string;
  runtime: number | null;
  genres: { id: number; name: string }[];
  overview: string;
  poster_path: string;
  production_countries: { iso_3166_1: string; name: string }[];
  vote_average: number;
  vote_count: number;
  weightedRating?: number;
  credits?: {
    crew: { job: string; name: string }[];
    cast: { name: string }[];
  };
}

const allowedCountries = ["US", "CN", "FR", "DE", "JP", "GB", "KR", "IT"];
const C = 3000;
const globalAverage = 6.5;

// Fonction pour récupérer les détails d'un film et ses crédits
async function fetchMovieDetails(movieId: number, apiKey: string) {
  const detailsResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr-FR`
  );
  const detailsData = await detailsResponse.json();

  const creditsResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=fr-FR`
  );
  const creditsData = await creditsResponse.json();

  return { ...detailsData, credits: creditsData };
}

// Fonction pour récupérer et filtrer les films
export async function fetchMovies(apiKey: string, currentPage: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&include_adult=false&sort_by=vote_average.desc&vote_count.gte=3000&page=${currentPage}`
  );
  const data = await response.json();
  const totalPages = Math.min(data.total_pages, 500);

  const movieDetailsPromises = data.results.map((movie: Movie) =>
    fetchMovieDetails(movie.id, apiKey)
  );

  let movies = await Promise.all(movieDetailsPromises);

  // Filtrer et exclure les films d'animation
  movies = movies.filter((movie: Movie) => {
    const movieCountries = movie.production_countries.map(
      (country) => country.iso_3166_1
    );
    const isAllowedCountry = movieCountries.some((country) =>
      allowedCountries.includes(country)
    );
    const isAnimation = movie.genres.some(
      (genre) => genre.name === "Animation"
    );
    return isAllowedCountry && !isAnimation;
  });

  // Calculer la note pondérée
  movies = movies.map((movie) => ({
    ...movie,
    weightedRating:
      (movie.vote_count / (movie.vote_count + C)) * movie.vote_average +
      (C / (movie.vote_count + C)) * globalAverage,
  }));

  // Trier par note pondérée
  movies = movies.sort(
    (a, b) => (b.weightedRating ?? 0) - (a.weightedRating ?? 0)
  );

  return { movies, totalPages };
}
