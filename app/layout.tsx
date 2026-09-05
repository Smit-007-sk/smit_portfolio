import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Preloader from "@/components/Preloader";
import SourceProtectionProvider from "@/components/SourceProtectionProvider";

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
  icons: {
    icon: "/final-logo.png",
    apple: "/final-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B0C10" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0C10" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${displaySerif.variable} antialiased bg-[#0B0C10] text-white selection:bg-white selection:text-[#F14E08]`}
    >
      <head>
        <meta name="theme-color" content="#0B0C10" />
        <meta name="msapplication-navbutton-color" content="#0B0C10" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-screen bg-[#0B0C10] text-white flex flex-col font-sans overflow-x-hidden">
        <SourceProtectionProvider>
          <Preloader />
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </SourceProtectionProvider>
      </body>
    </html>
  );
}
