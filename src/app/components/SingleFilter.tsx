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
  isOptionDisabled?: boolean; // Nouvelle prop pour contrôler le désactivé de l'option
}

export function SingleFilter({
  title,
  options,
  selectedValue,
  onChange,
  isOptionDisabled = false, // Valeur par défaut à false
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
        _hover={{ bg: "gray.600" }}
        _active={{ bg: "gray.700" }}
        // Retirer isDisabled du MenuButton pour que le menu puisse s'ouvrir
      >
        {title}
      </MenuButton>
      <MenuList
        bg="gray.700"
        width="100%"
        maxHeight="65vh" // Limite la hauteur maximale à 65vh
        overflowY="auto" // Ajoute un défilement vertical si nécessaire
      >
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
              isDisabled={isOptionDisabled && option.value === selectedValue} // Désactive l'option si nécessaire
            >
              {option.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
