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
    formats: ['image/webp', 'image/avif'],
  },
  // SEO optimizations
  experimental: {
    optimizePackageImports: ['@/components/ui', 'lucide-react'],
  },
  // Enable compression
  compress: true,
  // Generate sitemap and robots automatically
  trailingSlash: false,
  // Performance optimizations
  poweredByHeader: false,
  // Build optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
