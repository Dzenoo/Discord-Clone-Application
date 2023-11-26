import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import SidebarChannels from "@/components/shared/navigation/SidebarChannels";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatcord",
  description:
    "This is a Discord Clone Application built with Next.js, Typesscript and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex`}>
        <SidebarChannels />
        {children}
      </body>
    </html>
  );
}
