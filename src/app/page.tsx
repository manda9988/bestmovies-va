// page.tsx

import { Flex } from "@chakra-ui/react";
import Header from "./components/Header";
import { FilterPanel } from "./components/FilterPanel";
import MoviesPanel from "./components/MoviesPanel";

export default function Home() {
  return (
    <Flex
      direction="column"
      alignItems="center"
      padding="4"
      bg="gray.800"
      color="white"
      minHeight="100vh"
    >
      <Header />
      <FilterPanel />
      <MoviesPanel />
    </Flex>
  );
}
