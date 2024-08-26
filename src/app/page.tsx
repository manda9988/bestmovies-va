// page.tsx
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
  VStack,
} from "@chakra-ui/react";
import { FaSearch, FaChevronDown } from "react-icons/fa";

export default function Home() {
  return (
    <Flex
      direction="column"
      alignItems="center"
      padding="4"
      bg="gray.800"
      color="white"
      minHeight="100vh"
    >
      <Heading as="h1" size="2xl" marginBottom="5" marginLeft="20px">
        bestMovies
      </Heading>
      <InputGroup width={{ base: "85%", md: "60%" }} maxWidth="600px">
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

      <VStack
        spacing={4}
        align="stretch"
        width={{ base: "85%", md: "60%" }}
        marginTop="6"
      >
        <Menu closeOnSelect={false}>
          <MenuButton
            as={Button}
            rightIcon={<FaChevronDown />}
            colorScheme="gray"
            variant="outline"
          >
            Par genres
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup title="Genres" type="checkbox">
              <MenuItemOption value="action">Action</MenuItemOption>
              <MenuItemOption value="comedy">Comedy</MenuItemOption>
              <MenuItemOption value="drama">Drama</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>

        <Menu closeOnSelect={false}>
          <MenuButton
            as={Button}
            rightIcon={<FaChevronDown />}
            colorScheme="gray"
            variant="outline"
          >
            Par années de production
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup title="Années" type="checkbox">
              <MenuItemOption value="2020">2020</MenuItemOption>
              <MenuItemOption value="2021">2021</MenuItemOption>
              <MenuItemOption value="2022">2022</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>

        <Menu closeOnSelect={false}>
          <MenuButton
            as={Button}
            rightIcon={<FaChevronDown />}
            colorScheme="gray"
            variant="outline"
          >
            Par pays
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup title="Pays" type="checkbox">
              <MenuItemOption value="us">États-Unis</MenuItemOption>
              <MenuItemOption value="fr">France</MenuItemOption>
              <MenuItemOption value="jp">Japon</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </VStack>
    </Flex>
  );
}
