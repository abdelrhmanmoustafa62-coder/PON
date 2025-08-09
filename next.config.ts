import type { NextConfig } from "next";

import path from "node:path";
const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

// Get repository name from homepage URL or use a default
const REPO_NAME = 'consulting-website';
const BASE_PATH = process.env.NODE_ENV === 'production' ? `/${REPO_NAME}` : '';

const nextConfig: NextConfig = {
  output: 'export', // Changed from 'standalone' to 'export' for static site generation
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Ensure proper build settings
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [LOADER]
      }
    }
  }
};

export default nextConfig;