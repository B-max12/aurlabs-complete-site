import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({ src: "./fonts/inter-latin-wght-normal.woff2", variable: "--font-inter", display: "swap", weight: "100 900" });

export const metadata: Metadata = {
  metadataBase: new URL("https://aurlabs.online"),
  title: "Aur Labs — Good software. For everyone.",
  description: "An independent, non-profit software lab building useful free tools for people everywhere. Explore our work, join the team, or share a problem worth solving.",
  openGraph: {title:"Aur Labs — Good software. For everyone.",description:"Useful tools. Thoughtful design. Zero price tags.",type:"website",images:[{url:"/assets/aur-sculpture.png",width:1254,height:1254,alt:"Aur Labs chrome sculpture"}]},
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
