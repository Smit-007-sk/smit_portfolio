import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Preloader from "@/components/Preloader";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const displaySerif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "SMIT KHATRI — Full-Stack Developer Portfolio",
  description: "Full-Stack Web Developer & UI/UX Architect crafting high-performance digital products, web applications, and interactive web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${displaySerif.variable} antialiased bg-[#F14E08] text-white selection:bg-white selection:text-[#F14E08]`}
    >
      <body className="min-h-screen bg-[#F14E08] text-white flex flex-col font-sans overflow-x-hidden">
        <Preloader />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
