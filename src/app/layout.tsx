import type { Metadata } from "next";
import React from "react";
import {CitySearchGlobalStateProvider} from "@/components/CitySearchGlobalState/CitySearchGlobalState";
import {Quicksand} from "next/font/google";

const font = Quicksand({
  subsets: ["latin", "latin-ext"],
  variable: "--font-qs"
});

export const metadata: Metadata = {
  title: "CitySearch",
  description: "Find information about any city in the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable}`}>
        <CitySearchGlobalStateProvider>
          {children}
        </CitySearchGlobalStateProvider>
      </body>
    </html>
  );
}
