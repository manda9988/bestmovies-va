// src/app/components/Header.tsx

"use client";

import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleResetFilters = () => {
    console.log("Resetting filters and navigating to the home page.");
    router.push("/?page=1"); // Utilisation de push au lieu de replace
    router.refresh(); // Forcer le re-rendu du côté serveur
  };

  return (
    <Heading
      as="h1"
      size="2xl"
      padding="6"
      cursor="pointer"
      onClick={handleResetFilters}
    >
      BestMovies
    </Heading>
  );
}
