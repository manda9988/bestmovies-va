// layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Findmovies",
  description: "A simple app to search for movies and series",
  icons: {
    icon: "/faviconLogo.png", // Ajout du chemin vers ton favicon dans le dossier public
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/faviconLogo.png" />{" "}
        {/* Ajout explicite de la balise favicon */}
      </head>
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
