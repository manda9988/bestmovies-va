// FilterMenu.tsx

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";

interface FilterMenuProps {
  title: string;
  options: { value: string; label: string }[];
}

export default function FilterMenu({ title, options }: FilterMenuProps) {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        rightIcon={<FaChevronDown />}
        colorScheme="gray"
        variant="outline"
      >
        {title}
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup title={title} type="checkbox">
          {options.map((option) => (
            <MenuItemOption key={option.value} value={option.value}>
              {option.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
