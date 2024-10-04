// src/app/components/FilterPanel.tsx

import { VStack } from "@chakra-ui/react";
import { SingleFilter } from "./SingleFilter";
import { Genre } from "../../types"; // Import du type Genre

interface FilterPanelProps {
  selectedYear: string;
  onYearChange: (yearRange: string | null) => void;
  selectedGenre: string;
  onGenreChange: (genre: string | null) => void;
  genres: Genre[]; // Liste des genres disponibles
}

export function FilterPanel({
  selectedYear,
  onYearChange,
  selectedGenre,
  onGenreChange,
  genres,
}: FilterPanelProps) {
  const handleYearChange = (value: string) => {
    if (value) {
      onYearChange(value);
    } else {
      onYearChange(null);
    }
  };

  const handleGenreChange = (value: string) => {
    if (value) {
      onGenreChange(value);
    } else {
      onGenreChange(null);
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

      {/* Nouveau filtre pour les genres */}
      <SingleFilter
        title="Par Genre"
        options={genres.map((genre) => ({
          value: genre.id.toString(),
          label: genre.name,
        }))}
        selectedValue={selectedGenre}
        onChange={handleGenreChange}
      />

      <SingleFilter
        title="Trier par"
        options={[{ value: "rating", label: "Note spectateurs" }]}
        selectedValue="rating"
        isOptionDisabled={true}
      />
    </VStack>
  );
}
