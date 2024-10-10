// src/app/components/Footer.tsx

import { Flex, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex as="footer" mt="60px" py="4" justifyContent="center" width="100%">
      <Text fontSize={{ base: "10px", md: "xs" }} color="gray.500">
        © 2024 Findmovies. Vincent Achy. All rights reserved.
      </Text>
    </Flex>
  );
}
