import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchUser } from "@/library/actions/user.actions";
import SidebarServers from "@/components/shared/navigation/SidebarServers";
import AuthProvider from "@/context/AuthProvider";
import "../globals.css";

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
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  const user = await fetchUser(userId);
  const servers = JSON.parse(JSON.stringify(user?.servers));

  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className} flex`}>
          <SidebarServers servers={servers} userId={userId} />
          <main className="w-full">{children}</main>
        </body>
      </AuthProvider>
    </html>
  );
}
