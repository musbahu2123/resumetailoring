import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true, // This allows SVG optimization
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Security policy for SVGs
  },
};

export default nextConfig;