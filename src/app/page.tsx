// page.tsx

import { Flex } from "@chakra-ui/react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { FilterMenus } from "./components/FilterMenu";

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
      <SearchBar />
      <FilterMenus />
    </Flex>
  );
}
