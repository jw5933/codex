/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PORT: process.env.PORT || 3001,
  },
  experimental: { esmExternals: true },
};

module.exports = nextConfig;
