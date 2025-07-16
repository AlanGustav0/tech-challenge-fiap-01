/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    // Nenhum plugin adicional necessário para Single-SPA
    return config;
  },
};

export default nextConfig;
