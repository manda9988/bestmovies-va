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
          { value: "2020-2029", label: "2020 - 2029" },
          { value: "2010-2019", label: "2010 - 2019" },
          { value: "2000-2009", label: "2000 - 2009" },
          { value: "1990-1999", label: "1990 - 1999" },
          { value: "1980-1989", label: "1980 - 1989" },
          { value: "1970-1979", label: "1970 - 1979" },
          { value: "1960-1969", label: "1960 - 1969" },
          { value: "1950-1959", label: "1950 - 1959" },
          { value: "1940-1949", label: "1940 - 1949" },
          { value: "1930-1939", label: "1930 - 1939" },
          { value: "1920-1929", label: "1920 - 1929" },
          { value: "1910-1919", label: "1910 - 1919" },
          { value: "1900-1909", label: "1900 - 1909" },
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
      <SingleFilter
        title="Trier par"
        options={[{ value: "rating", label: "Note spectateurs" }]}
      />
    </VStack>
  );
}
