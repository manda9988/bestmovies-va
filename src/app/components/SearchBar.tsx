// SearchBar.tsx

import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <InputGroup
      width={{ base: "85%", md: "60%" }}
      maxWidth="600px"
      marginBottom="5"
    >
      <Input
        placeholder="Tapez votre recherche..."
        bg="gray.700"
        color="white"
        borderRadius="md"
        paddingRight="4rem"
      />
      <InputRightElement>
        <FaSearch color="white" />
      </InputRightElement>
    </InputGroup>
  );
}
