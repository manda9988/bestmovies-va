// src/app/components/SingleFilter.tsx

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";

interface SingleFilterProps {
  title: string;
  options: { value: string; label: string }[];
  selectedValue?: string;
  onChange?: (value: string) => void;
}

export function SingleFilter({
  title,
  options,
  selectedValue,
  onChange,
}: SingleFilterProps) {
  return (
    <Menu closeOnSelect={true} matchWidth>
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
        <MenuOptionGroup
          type="radio"
          value={selectedValue}
          onChange={(value) => onChange?.(value as string)}
        >
          {options.map((option) => (
            <MenuItemOption
              bg="gray.700"
              color="white"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
