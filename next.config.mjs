/** @type {import('next').NextConfig} */
const nextConfig = {
  // Já existia — resolve o bug do Prisma
  serverExternalPackages: ['@prisma/client'],

  // Novo — aumenta o limite de tamanho para o upload de imagens/PDFs
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;