import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Access ROI — Options Over Obligations",
  description:
    "The field guide to picking an education path that actually pays. Run the numbers before you sign the loan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}