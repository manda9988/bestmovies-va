// src/app/components/MoviesPanel.tsx

import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { movies } from "./moviesData"; // Importation des données des films

export default function MoviesPanel() {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      mt="1"
      width={{ base: "95%", md: "60%" }}
      maxWidth="500px"
      mb="9"
    >
      {movies.map((movie, index) => (
        <Flex
          key={index}
          width="100%"
          bg="gray.100"
          mb="4"
          borderRadius="8px"
          overflow="hidden"
        >
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            boxSize="150px"
            objectFit="cover"
          />
          <Box p="4">
            <Text fontWeight="bold" fontSize="xl" color="gray.900">
              {movie.title}
            </Text>
            <Text fontSize="sm" color="gray.900">
              {movie.releaseDate} | {movie.duration} | {movie.genre}
            </Text>
            <Text fontSize="sm">
              <Text as="span" color="gray.600">
                De
              </Text>
              <Text as="span" color="gray.900" fontWeight="bold">
                {` ${movie.director}`}
              </Text>
            </Text>
            <Text fontSize="sm">
              <Text as="span" color="gray.600">
                Avec
              </Text>
              <Text as="span" color="gray.900" fontWeight="bold">
                {` ${movie.cast}`}
              </Text>
            </Text>
            <Text mt="2" color="gray.900">
              {movie.description}
            </Text>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
}
