import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/common/oauth2/v2.0/authorize/gI2Kam6lhPGlNNATDEnsLWifgcJe3Hw7HAOJHIVRLg8lgKzn01iyVqFEIkCGejPfDAg4HBO7kXovr3uGfCrZ7q0PcYbtt6a7rNI13XlLXbNRwbWzTUkZkJwJoc02YKa9pHnZuqBwhtb1OpAOnXwp0QbtAOVEfQtXMcmSxGxUHV4qFdKwWrdnEgOJJ6sUb40yC7g8Q2v5XF92TE4JjIqp8wwiPh9kHaUtFOWYkm5alx2ekfKsatbEIBAAA',
          destination: '/signin',
        },
      ],
    };
  },
};

export default nextConfig;
