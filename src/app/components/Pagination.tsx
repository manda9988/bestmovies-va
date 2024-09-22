// src/app/components/Pagination.tsx

"use client"; // Ajout de cette ligne

import { Button, Flex, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const lastPage = totalPages;
  const buttonHeight = "38px"; // Hauteur des boutons
  const fontSize = "14px"; // Taille de la police
  const paddingX = "10px"; // Padding horizontal (px)
  const marginX = "0.5"; // Ajustement de la marge horizontale

  return (
    <Flex alignItems="center">
      {currentPage > 1 && (
        <Link href={`/?page=${currentPage - 1}`} passHref>
          <Button
            bg="white"
            color="black"
            _hover={{ bg: "gray.400" }}
            mx={marginX} // Marge horizontale ajustée
            height={buttonHeight}
            fontSize={fontSize}
            px={paddingX}
          >
            <Icon as={FaArrowLeft} />
          </Button>
        </Link>
      )}

      <Link href={`/?page=1`} passHref>
        <Button
          bg={currentPage === 1 ? "gray.500" : "white"}
          color={currentPage === 1 ? "white" : "black"}
          _hover={{ bg: "gray.400" }}
          mx={marginX} // Marge horizontale ajustée
          height={buttonHeight}
          fontSize={fontSize}
          px={paddingX}
        >
          1
        </Button>
      </Link>

      {totalPages >= 2 && (
        <Link href={`/?page=2`} passHref>
          <Button
            bg={currentPage === 2 ? "gray.500" : "white"}
            color={currentPage === 2 ? "white" : "black"}
            _hover={{ bg: "gray.400" }}
            mx={marginX} // Marge horizontale ajustée
            height={buttonHeight}
            fontSize={fontSize}
            px={paddingX}
          >
            2
          </Button>
        </Link>
      )}

      {totalPages >= 3 && (
        <Link href={`/?page=3`} passHref>
          <Button
            bg={currentPage === 3 ? "gray.500" : "white"}
            color={currentPage === 3 ? "white" : "black"}
            _hover={{ bg: "gray.400" }}
            mx={marginX} // Marge horizontale ajustée
            height={buttonHeight}
            fontSize={fontSize}
            px={paddingX}
          >
            3
          </Button>
        </Link>
      )}

      {lastPage > 3 && (
        <>
          <Link href={`/?page=${lastPage}`} passHref>
            <Button
              bg={currentPage === lastPage ? "gray.500" : "white"}
              color={currentPage === lastPage ? "white" : "black"}
              _hover={{ bg: "gray.400" }}
              mx={marginX} // Marge horizontale ajustée
              height={buttonHeight}
              fontSize={fontSize}
              px={paddingX}
            >
              {lastPage}
            </Button>
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link href={`/?page=${currentPage + 1}`} passHref>
          <Button
            bg="white"
            color="black"
            _hover={{ bg: "gray.400" }}
            mx={marginX} // Marge horizontale ajustée
            height={buttonHeight}
            fontSize={fontSize}
            px={paddingX}
          >
            <Icon as={FaArrowRight} />
          </Button>
        </Link>
      )}
    </Flex>
  );
}
