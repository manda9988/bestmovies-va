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
    icon: "/faviconLogo64.png",
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
        <link rel="icon" href="/faviconLogo64.png" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ChakraProvider>
          <Flex bg="#141414" direction="column" minHeight="100vh">
            {children}
          </Flex>
        </ChakraProvider>
      </body>
    </html>
  );
}
