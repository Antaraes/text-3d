/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.meshy.ai',
        port: '',
      },
    ],
  },
};

export default nextConfig;
