import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aur Labs — Good software. For everyone.",
    short_name: "Aur Labs",
    description:
      "An independent software lab building useful, free desktop, mobile, and CLI tools for people everywhere.",
    start_url: "/",
    display: "standalone",
    background_color: "#EDE8E4",
    theme_color: "#8D6613",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
