// Header.tsx

import { Heading } from "@chakra-ui/react";
import Link from "next/link";

export default function Header() {
  return (
    <Link href="/" passHref>
      <Heading as="h1" size="2xl" padding="6" cursor="pointer">
        BestMovies
      </Heading>
    </Link>
  );
}
