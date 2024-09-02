// page.tsx

import { Flex } from "@chakra-ui/react";
import Header from "./components/Header";
import { FilterPanel } from "./components/FilterPanel";
import MoviesPanel from "./components/MoviesPanel";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <Flex
      direction="column"
      alignItems="center"
      bg="gray.800"
      color="white"
      minHeight="100vh"
    >
      <Header />
      <FilterPanel />
      <MoviesPanel />
      <Footer />
    </Flex>
  );
}
