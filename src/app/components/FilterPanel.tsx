// src/app/components/FilterPanel.tsx

import { VStack } from "@chakra-ui/react";
import { SingleFilter } from "./SingleFilter";

export function FilterPanel({
  selectedYear,
  onYearChange,
}: {
  selectedYear: string;
  onYearChange: (yearRange: string | null) => void;
}) {
  const handleYearChange = (value: string) => {
    console.log("Year filter changed:", value);
    if (value) {
      onYearChange(value); // Si une année est sélectionnée, on la transmet
    } else {
      onYearChange(null); // Si aucune année n'est sélectionnée, on envoie 'null'
    }
  };

  return (
    <VStack
      spacing={4}
      align="stretch"
      width={{ base: "95%", md: "60%" }}
      maxWidth="500px"
      marginBottom="6"
    >
      <SingleFilter
        title="Par années de production"
        options={[
          { value: "2020-2029", label: "2020 - 2029" },
          { value: "2010-2019", label: "2010 - 2019" },
          { value: "2000-2009", label: "2000 - 2009" },
          { value: "1990-1999", label: "1990 - 1999" },
          { value: "1980-1989", label: "1980 - 1989" },
        ]}
        selectedValue={selectedYear}
        onChange={handleYearChange}
      />

      {/* Modifications ici : utilisation de isOptionDisabled */}
      <SingleFilter
        title="Trier par"
        options={[{ value: "rating", label: "Note spectateurs" }]}
        selectedValue="rating"
        isOptionDisabled={true}
      />
    </VStack>
  );
}
