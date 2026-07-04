import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brown Sugar Boba Tea — A Symphony of Indulgence",
  description: "Experience the premium, slow-motion transformation of our luxury Brown Sugar Boba Tea. Hand-crafted, rich marbling, and gloss tapioca pearls.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-black selection:bg-[#B56A2D]/30 selection:text-[#FFF8F1]">
      <body
        className={`${inter.variable} ${cormorant.variable} font-sans antialiased text-[#E7D8C9] bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
