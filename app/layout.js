import "./globals.css";

import { josefinSans, monaspaceArgon } from "./fonts"; 

import { createPageMetadata } from "@/utils/metadata";

export const metadata = createPageMetadata(
    "p1ps.net",
    "p1ps fait des trucs avec son ordi.",
    ""
)

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${josefinSans.variable} ${monaspaceArgon.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
