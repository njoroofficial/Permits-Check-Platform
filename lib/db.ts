import { PrismaClient } from "./generated/prisma";

// Prevent multiple instances during development hot-reloading
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

// Prevent multiple connections in development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
