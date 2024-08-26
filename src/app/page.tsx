// page.tsx

import { Flex, VStack } from "@chakra-ui/react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterMenu from "./components/FilterMenu";

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
      <VStack
        spacing={4}
        align="stretch"
        width={{ base: "85%", md: "60%" }}
        marginTop="6"
      >
        <FilterMenu
          title="Par genres"
          options={[
            { value: "action", label: "Action" },
            { value: "comedy", label: "Comedy" },
            { value: "drama", label: "Drama" },
          ]}
        />
        <FilterMenu
          title="Par années de production"
          options={[
            { value: "2020", label: "2020" },
            { value: "2021", label: "2021" },
            { value: "2022", label: "2022" },
          ]}
        />
        <FilterMenu
          title="Par pays"
          options={[
            { value: "us", label: "États-Unis" },
            { value: "fr", label: "France" },
            { value: "jp", label: "Japon" },
          ]}
        />
      </VStack>
    </Flex>
  );
}
