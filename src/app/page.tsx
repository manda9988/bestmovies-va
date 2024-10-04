// src/app/page.tsx

import { Flex } from "@chakra-ui/react";
import Header from "./components/Header";
import MoviesPanel from "./components/MoviesPanel";
import Footer from "./components/Footer";
import { fetchGenres } from "../utils/fetchGenres"; // Nouvelle fonction pour récupérer les genres
import { Genre } from "../types"; // Import du type Genre

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string; year?: string; genre?: string };
}) {
  const currentPage = parseInt(searchParams.page || "1", 10);
  const selectedYear = searchParams.year || "";
  const selectedGenre = searchParams.genre || "";

  // Récupérer la liste des genres
  const genres: Genre[] = await fetchGenres(
    process.env.NEXT_PUBLIC_TMDB_API_KEY ?? ""
  );

  return (
    <Flex
      direction="column"
      alignItems="center"
      bg="gray.800"
      color="white"
      minHeight="100vh"
    >
      <Header />
      <MoviesPanel
        currentPage={currentPage}
        selectedYear={selectedYear}
        selectedGenre={selectedGenre}
        genres={genres} // Passer les genres au MoviesPanel
      />
      <Flex flexGrow={1} />
      <Footer />
    </Flex>
  );
}
