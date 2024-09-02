// src/app/components/Footer.tsx

import { Flex, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      as="footer"
      mt="auto"
      py="4"
      justifyContent="center"
      width="100%"
    >
      <Text fontSize="sm" color="gray.500">
        © 2024 BestMovies. All rights reserved.
      </Text>
    </Flex>
  );
}
