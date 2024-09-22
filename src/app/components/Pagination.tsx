// src/app/components/Pagination.tsx

"use client";

import { Button, Flex, Icon } from "@chakra-ui/react";
import { Pagination } from "@ark-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function CustomPagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const buttonHeight = "38px"; // Hauteur des boutons
  const fontSize = "14px"; // Taille de la police
  const paddingX = "10px"; // Padding horizontal (px)
  const marginX = "0.5"; // Ajustement de la marge horizontale

  return (
    <Pagination.Root
      count={totalPages * 10}
      pageSize={10}
      page={currentPage}
      onPageChange={(details) => {
        window.location.href = `/?page=${details.page}`;
      }}
    >
      <Flex alignItems="center">
        <Pagination.PrevTrigger asChild>
          <Button
            bg="white"
            color="black"
            _hover={{ bg: "gray.400" }}
            mx={marginX}
            height={buttonHeight}
            fontSize={fontSize}
            px={paddingX}
          >
            <Icon as={FaArrowLeft} />
          </Button>
        </Pagination.PrevTrigger>

        <Pagination.Context>
          {(pagination) =>
            pagination.pages.map((page, index) =>
              page.type === "page" ? (
                <Pagination.Item key={index} {...page} asChild>
                  <Button
                    bg={currentPage === page.value ? "gray.500" : "white"}
                    color={currentPage === page.value ? "white" : "black"}
                    _hover={{ bg: "gray.400" }}
                    mx={marginX}
                    height={buttonHeight}
                    fontSize={fontSize}
                    px={paddingX}
                  >
                    {page.value}
                  </Button>
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis key={index} index={index}>
                  &#8230;
                </Pagination.Ellipsis>
              )
            )
          }
        </Pagination.Context>

        <Pagination.NextTrigger asChild>
          <Button
            bg="white"
            color="black"
            _hover={{ bg: "gray.400" }}
            mx={marginX}
            height={buttonHeight}
            fontSize={fontSize}
            px={paddingX}
          >
            <Icon as={FaArrowRight} />
          </Button>
        </Pagination.NextTrigger>
      </Flex>
    </Pagination.Root>
  );
}
