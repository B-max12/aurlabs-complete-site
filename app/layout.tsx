import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        <meta
          name="ahrefs-site-verification"
          content="6248bc27d686b11f57559455e7683b95fcaaa5857e94bf407956ea3604d20e8b"
        />
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="K19aZ9FVVOgCDDg7huwGGg"
          async
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
