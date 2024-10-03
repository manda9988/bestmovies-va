// src/types/index.ts

export interface Genre {
  id: number;
  name: string;
}

export interface Country {
  iso_3166_1: string;
  name: string;
}

export interface CrewMember {
  job: string;
  name: string;
}

export interface CastMember {
  name: string;
}

export interface Credits {
  crew: CrewMember[];
  cast: CastMember[];
}

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  runtime: number | null;
  genres: Genre[];
  overview: string;
  poster_path: string;
  production_countries: Country[]; // Ajouté
  credits?: Credits;
}

export interface TransformedMovie {
  title: string;
  releaseDate: string;
  duration: string;
  genre: string;
  director: string;
  cast: string;
  description: string;
  posterUrl: string;
}
