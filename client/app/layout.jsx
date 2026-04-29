import { Inter, Playfair_Display } from "next/font/google";
import { AppProvider } from "@/lib/context/AppProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "LuxeEstate — Premium Properties in Bangladesh",
  description:
    "Discover premium properties across Bangladesh. From Gulshan penthouses to Purbachal villas — buy, rent, or sell with confidence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans text-gray-900 antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
