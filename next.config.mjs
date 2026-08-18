/** @type {import('next').NextConfig} */
const nextConfig = {
  // Adicione esta linha para resolver o bug do Prisma
  serverExternalPackages: ['@prisma/client'],
};

export default nextConfig;