import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavMenu from "./components/NavMenu";
import { Footer } from "./components/Footer";
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Students4Students",
  description: "Personalized college mentorship program, sign up for 15-minute free trial today!",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`} id="root">
        <div className="w-full flex flex-row-reverse p-6">
          <NavMenu />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
