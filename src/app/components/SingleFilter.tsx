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
  isOptionDisabled?: boolean;
}

export function SingleFilter({
  title,
  options,
  selectedValue,
  onChange,
  isOptionDisabled = false,
}: SingleFilterProps) {
  return (
    <Menu closeOnSelect={true} matchWidth>
      <MenuButton
        as={Button}
        rightIcon={<FaChevronDown />}
        width="100%" // ← Ajouté
        colorScheme="gray"
        variant="outline"
        bg="gray.800"
        color="gray.300"
        textAlign="left"
        pl={4}
        _hover={{ bg: "gray.700" }}
        _active={{ bg: "gray.700" }}
      >
        {title}
      </MenuButton>
      <MenuList bg="gray.800" width="100%" maxHeight="50vh" overflowY="auto">
        <MenuOptionGroup
          type="radio"
          value={selectedValue}
          onChange={(value) => onChange?.(value as string)}
        >
          {options.map((option) => (
            <MenuItemOption
              bg="gray.800"
              color="white"
              key={option.value}
              value={option.value}
              isDisabled={isOptionDisabled && option.value === selectedValue}
            >
              {option.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
