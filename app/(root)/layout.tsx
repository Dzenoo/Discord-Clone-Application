import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import SidebarServers from "@/components/shared/navigation/SidebarServers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatcord",
  description:
    "This is a Discord Clone Application built with Next.js, Typesscript and Tailwind CSS",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex`}>
        <SidebarServers />
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
