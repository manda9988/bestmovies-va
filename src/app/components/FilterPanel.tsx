// src/app/components/FilterPanel.tsx

import { VStack } from "@chakra-ui/react";
import { SingleFilter } from "./SingleFilter";

export function FilterPanel() {
  return (
    <VStack
      spacing={4}
      align="stretch"
      width={{ base: "95%", md: "60%" }}
      maxWidth="500px"
      marginBottom="6"
    >
      <SingleFilter
        title="Par genres"
        options={[
          { value: "action", label: "Action" },
          { value: "comedy", label: "Comedy" },
          { value: "drama", label: "Drama" },
        ]}
      />
      <SingleFilter
        title="Par années de production"
        options={[
          { value: "2020", label: "2020" },
          { value: "2021", label: "2021" },
          { value: "2022", label: "2022" },
        ]}
      />
      <SingleFilter
        title="Par pays"
        options={[
          { value: "us", label: "États-Unis" },
          { value: "fr", label: "France" },
          { value: "jp", label: "Japon" },
        ]}
      />
    </VStack>
  );
}
