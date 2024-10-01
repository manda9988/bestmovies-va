// src/app/page.tsx

import { Flex } from "@chakra-ui/react";
import Header from "./components/Header";
import MoviesPanel from "./components/MoviesPanel";
import Footer from "./components/Footer";

export default function Home({
  searchParams,
}: {
  searchParams: { page?: string; year?: string };
}) {
  const currentPage = parseInt(searchParams.page || "1", 10);
  const selectedYear = searchParams.year || "";

  console.log("Current page from URL:", currentPage);
  console.log("Selected year from URL:", selectedYear);

  return (
    <Flex
      direction="column"
      alignItems="center"
      bg="gray.800"
      color="white"
      minHeight="100vh"
    >
      <Header />
      <MoviesPanel currentPage={currentPage} selectedYear={selectedYear} />
      <Flex flexGrow={1} />
      <Footer />
    </Flex>
  );
}
