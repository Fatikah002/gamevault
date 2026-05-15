import { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Breadcrumb from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "GameVault",
  description: "Game Catalog Website",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Breadcrumb />
        <main className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
