import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: [
      "i.imgur.com",
      "api.escuelajs.co",
      "images.unsplash.com",
      "i.redd.it",
      "preview.redd.it",
      "media.tenor.com",
      "kep.cdn.indexvas.hu",
      "i.makeagif.com",
    ],
  },
};

export default nextConfig;
