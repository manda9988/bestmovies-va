// src/app/components/MovieCard.tsx

import { Box, Grid, Image, Text } from "@chakra-ui/react";

interface Movie {
  title: string;
  releaseDate: string;
  duration: string;
  genre: string;
  director: string;
  cast: string;
  description: string;
  posterUrl: string;
}

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Box width="100%" bg="gray.100" mb="4" borderRadius="8px" overflow="hidden">
      <Grid templateColumns="35% 65%" gap={3} p="2">
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          width="100%"
          objectFit="contain"
        />
        <Box pr="12px">
          <Text fontWeight="extrabold" fontSize="2xl" color="gray.900">
            {movie.title}
          </Text>
          <Text fontSize="sm" color="gray.900">
            {movie.releaseDate} | {movie.duration} | {movie.genre}
          </Text>
          <Text fontSize="sm" pt="2">
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
        </Box>
      </Grid>
      <Box pt="1" pb="3" px="3">
        <Text color="gray.900">{movie.description}</Text>
      </Box>
    </Box>
  );
}
