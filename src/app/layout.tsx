// layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChakraProvider, Flex } from "@chakra-ui/react"; // Ajout de Flex
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Best Movies",
  description: "A simple app to search for movies and series",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <Flex direction="column" minHeight="100vh">
            {children}
          </Flex>
        </ChakraProvider>
      </body>
    </html>
  );
}
