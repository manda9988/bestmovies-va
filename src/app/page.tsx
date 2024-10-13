// page.tsx

import { Flex, Box } from "@chakra-ui/react";
import Header from "./components/Header";
import MoviesPanel from "./components/MoviesPanel";
import Footer from "./components/Footer";
import { fetchGenres } from "../utils/fetchGenres";
import { Genre } from "../types";

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
    <Flex direction="column" minHeight="100vh">
      <Box
        bgImage="url('/bgBox1.png')"
        bgSize="300px"
        bgRepeat="repeat"
        color="white"
        mx="auto"
        width="100%"
        maxWidth="700px"
        flex="1"
        className="custom-shadow"
        display="flex"
        flexDirection="column"
      >
        <Header />
        <Box flex="1">
          <MoviesPanel
            currentPage={currentPage}
            selectedYear={selectedYear}
            selectedGenre={selectedGenre}
            genres={genres}
          />
        </Box>
        <Footer />
      </Box>
    </Flex>
  );
}
