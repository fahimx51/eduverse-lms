import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
  // We cast to any here to bypass the strict type definition of NextConfig
} as any;

(nextConfig as any).typescript = { ignoreBuildErrors: true };
(nextConfig as any).eslint = { ignoreDuringBuilds: true };

export default nextConfig;