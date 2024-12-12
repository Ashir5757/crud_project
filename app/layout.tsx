import { Toaster } from 'sonner';
import type { Metadata } from "next";
import { Nav } from "@/components/custom/Nav";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",  
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NEAR",
  description: "Products Near You",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo/WhatsApp Image 2024-11-02 at 3.53.42 PM.jpeg"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-r from-indigo-200 via-cyan-200 to-teal-100 bg-no-repeat min-h-screen m-0  w-full p-2`}
      >
              <Toaster position="top-right" richColors />

        <Nav/>
        {children}
      </body>
    </html>
  );
}
