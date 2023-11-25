import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Discord Clone Application",
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
      <body>{children}</body>
    </html>
  );
}
