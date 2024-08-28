// FilterMenu.tsx

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
  VStack,
  Checkbox,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";

interface FilterMenuProps {
  title: string;
  options: { value: string; label: string }[];
}

export function FilterMenu({ title, options }: FilterMenuProps) {
  return (
    <Menu closeOnSelect={false} matchWidth>
      <MenuButton
        as={Button}
        rightIcon={<FaChevronDown />}
        colorScheme="gray"
        variant="outline"
        bg="gray.700"
        color="white"
        textAlign="left"
        pl={4}
        _hover={{ bg: "gray.700" }}
        _active={{ bg: "gray.700" }}
      >
        {title}
      </MenuButton>
      <MenuList bg="gray.700" width="100%">
        <MenuOptionGroup type="checkbox">
          {options.map((option) => (
            <MenuItemOption
              bg="gray.700"
              color="white"
              key={option.value}
              value={option.value}
              pl={0}
            >
              <Checkbox
                defaultChecked
                colorScheme="whiteAlpha"
                mr={2.5}
                mt={1} // Légèrement plus bas
                pl={0} // Pousse légèrement la checkbox plus à gauche
              />
              {option.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

export function FilterMenus() {
  return (
    <VStack
      spacing={4}
      align="stretch"
      width={{ base: "85%", md: "60%" }}
      maxWidth="600px"
      marginBottom="6"
    >
      <FilterMenu
        title="Par genres"
        options={[
          { value: "action", label: "Action" },
          { value: "comedy", label: "Comedy" },
          { value: "drama", label: "Drama" },
        ]}
      />
      <FilterMenu
        title="Par années de production"
        options={[
          { value: "2020", label: "2020" },
          { value: "2021", label: "2021" },
          { value: "2022", label: "2022" },
        ]}
      />
      <FilterMenu
        title="Par pays"
        options={[
          { value: "us", label: "États-Unis" },
          { value: "fr", label: "France" },
          { value: "jp", label: "Japon" },
        ]}
      />
    </VStack>
  );
}
