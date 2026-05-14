import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ['res.cloudinary.com', 'randomuser.me'],
  },
};

export default nextConfig;