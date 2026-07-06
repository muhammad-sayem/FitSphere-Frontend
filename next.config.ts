import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      throw new Error(
        "NEXT_PUBLIC_API_BASE_URL is not defined. Set it in .env.local before building."
      );
    }

    // Strip a trailing "/api/v1" (or similar) so the rewrite can re-append "/api/auth/:path*".
    const origin = apiBaseUrl.replace(/\/api\/v\d+\/?$/, "");

    return [
      {
        source: "/api/auth/:path*",
        destination: `${origin}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;