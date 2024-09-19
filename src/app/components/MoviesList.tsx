// src/app/components/MoviesList.tsx

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import Link from "next/link";

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

interface MoviesListProps {
  movies: Movie[];
  currentPage: number;
  totalPages: number;
}

export default function MoviesList({
  movies,
  currentPage,
  totalPages,
}: MoviesListProps) {
  const lastPage = totalPages;

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      mt="1"
      width="100%"
      maxWidth="500px"
      mb="9"
    >
      {movies.length > 0 ? (
        movies.map((movie, index) => <MovieCard key={index} movie={movie} />)
      ) : (
        <Text>Aucun film à afficher.</Text>
      )}

      <Flex justifyContent="space-between" mt="4" alignItems="center">
        {/* Bouton Précédent */}
        {currentPage > 1 ? (
          <Link href={`/?page=${currentPage - 1}`} passHref>
            <Button width="125px">Précédent</Button>
          </Link>
        ) : (
          <Button width="125px" isDisabled>
            Précédent
          </Button>
        )}

        {/* Pagination */}
        <Flex alignItems="center">
          {/* Bouton Page 1 */}
          <Link href={`/?page=1`} passHref>
            <Button
              bg={currentPage === 1 ? "gray.500" : "white"}
              color={currentPage === 1 ? "white" : "black"}
              _hover={{ bg: "gray.400" }}
              mx="1"
              size="sm"
            >
              1
            </Button>
          </Link>

          {/* Bouton Page 2 */}
          {totalPages >= 2 && (
            <Link href={`/?page=2`} passHref>
              <Button
                bg={currentPage === 2 ? "gray.500" : "white"}
                color={currentPage === 2 ? "white" : "black"}
                _hover={{ bg: "gray.400" }}
                mx="1"
                size="sm"
              >
                2
              </Button>
            </Link>
          )}

          {/* Bouton Page 3 */}
          {totalPages >= 3 && (
            <Link href={`/?page=3`} passHref>
              <Button
                bg={currentPage === 3 ? "gray.500" : "white"}
                color={currentPage === 3 ? "white" : "black"}
                _hover={{ bg: "gray.400" }}
                mx="1"
                size="sm"
              >
                3
              </Button>
            </Link>
          )}

          {/* Bouton Dernière Page */}
          {lastPage > 3 && (
            <>
              <Text mx="2">...</Text>
              <Link href={`/?page=${lastPage}`} passHref>
                <Button
                  bg={currentPage === lastPage ? "gray.500" : "white"}
                  color={currentPage === lastPage ? "white" : "black"}
                  _hover={{ bg: "gray.400" }}
                  mx="1"
                  size="sm"
                >
                  {lastPage}
                </Button>
              </Link>
            </>
          )}
        </Flex>

        {/* Bouton Suivant */}
        {currentPage < totalPages ? (
          <Link href={`/?page=${currentPage + 1}`} passHref>
            <Button width="125px">Suivant</Button>
          </Link>
        ) : (
          <Button width="125px" isDisabled>
            Suivant
          </Button>
        )}
      </Flex>
    </Box>
  );
}
