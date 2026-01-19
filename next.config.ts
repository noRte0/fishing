import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/common/oauth2/v2.0/authorize/:path*',
          destination: '/signin',
        },
      ],
    };
  },
};

export default nextConfig;
