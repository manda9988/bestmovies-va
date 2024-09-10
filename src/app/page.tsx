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
      flexGrow={1} // Ajoute ça pour étendre le contenu
    >
      <Header />
      <FilterPanel />
      <MoviesPanel />
      <Flex flexGrow={1} />
      <Footer />
    </Flex>
  );
}
