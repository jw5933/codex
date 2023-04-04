/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_SERVER: process.env.BACKEND_SERVER,
    // Add additional environment variables here as needed
  },
};

module.exports = nextConfig;
