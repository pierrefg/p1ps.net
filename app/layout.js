import "./globals.css";

export const metadata = {
  title: "p1ps_is_alive;",
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
