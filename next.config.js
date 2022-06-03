/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    JWT_TOKEN: process.env.JWT_TOKEN,
  },
};

module.exports = nextConfig;
