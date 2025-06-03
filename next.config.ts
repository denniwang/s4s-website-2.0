import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // SEO optimizations
  experimental: {
    optimizePackageImports: ['@/components/ui'],
  },
  // Enable compression
  compress: true,
  // Generate sitemap and robots automatically
  trailingSlash: false,
  // Performance optimizations
  poweredByHeader: false,
};

export default nextConfig;
