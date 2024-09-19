// src/app/components/Pagination.tsx

import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const lastPage = totalPages;

  return (
    <Flex alignItems="center">
      {/* Bouton Page 1 */}
      <Link href={`/?page=1`} passHref>
        <Button
          bg={currentPage === 1 ? "gray.500" : "white"}
          color={currentPage === 1 ? "white" : "black"}
          _hover={{ bg: "gray.400" }}
          mx="1"
          height="40px"
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
            height="40px"
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
            height="40px"
          >
            3
          </Button>
        </Link>
      )}

      {/* Bouton Dernière Page */}
      {lastPage > 3 && (
        <>
          <Link href={`/?page=${lastPage}`} passHref>
            <Button
              bg={currentPage === lastPage ? "gray.500" : "white"}
              color={currentPage === lastPage ? "white" : "black"}
              _hover={{ bg: "gray.400" }}
              mx="1"
              height="40px"
            >
              {lastPage}
            </Button>
          </Link>
        </>
      )}
    </Flex>
  );
}
