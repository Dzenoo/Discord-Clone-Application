import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import SidebarServers from "@/components/shared/navigation/SidebarServers";
import AuthProvider from "@/context/AuthProvider";

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
      <AuthProvider>
        <body className={`${inter.className} flex`}>
          <SidebarServers />
          <main className="w-full">{children}</main>
        </body>
      </AuthProvider>
    </html>
  );
}
