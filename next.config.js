/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone", // Docker
  images: {
    domains: ["imagedelivery.net"],
  },
};


module.exports = nextConfig;

