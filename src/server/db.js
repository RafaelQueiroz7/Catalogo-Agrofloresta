import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Cria o adapter de conexão com o Postgres usando a connection string do .env
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// Padrão "singleton" para evitar múltiplas instâncias do PrismaClient
// durante o hot-reload do Next.js em ambiente de desenvolvimento
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}