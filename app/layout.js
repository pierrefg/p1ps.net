import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { createPageMetadata } from "@/utils/metadata";

export const metadata = createPageMetadata(
    "p1ps.net",
    "P1ps fait des trucs avec son ordi.",
    ""
)

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
		    <link rel="stylesheet" href="https://use.typekit.net/dsi6anx.css" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
