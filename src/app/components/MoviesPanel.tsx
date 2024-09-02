// src/app/components/MoviesPanel.tsx

import { Box, Flex } from "@chakra-ui/react";

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
      {[...Array(10)].map((_, index) => (
        <Box
          key={index}
          width="100%"
          height="350px"
          bg="black"
          mb="4"
          borderRadius="8px"
        />
      ))}
    </Flex>
  );
}
