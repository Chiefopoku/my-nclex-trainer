import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavHeader from "@/components/NavHeader";
import SiteFooter from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NCLEX Adaptive Trainer | Clinical judgment practice",
    template: "%s | NCLEX Adaptive Trainer",
  },
  description:
    "Free NCLEX-RN practice: clinical-judgment scenarios with AI rationales, a 400+ fact high-yield cheat sheet, and the 2026 test plan. Built by a registered nurse.",
  openGraph: {
    title: "NCLEX Adaptive Trainer",
    description:
      "Clinical-judgment scenarios with AI rationales, a high-yield cheat sheet and the 2026 NCLEX-RN test plan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-slate-900 selection:bg-indigo-200 selection:text-indigo-900">
        <NavHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
