/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
    serverComponentsExternalPackages: ["cloudinary"],
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
