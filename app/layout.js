import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "p1ps_is_alive",
  description: "p1ps_is_alive",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
		<link rel="stylesheet" href="https://use.typekit.net/dsi6anx.css"></link>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
