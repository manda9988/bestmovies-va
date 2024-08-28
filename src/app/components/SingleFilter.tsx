// src/app/components/SingleFilter.tsx

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";

interface SingleFilterProps {
  title: string;
  options: { value: string; label: string }[];
}

export function SingleFilter({ title, options }: SingleFilterProps) {
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
                mt={1}
                pl={0}
              />
              {option.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
