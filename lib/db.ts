import { PrismaClient } from "./generated/prisma";

// Prevent multiple instances during development hot-reloading
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error", "warn"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    transactionOptions: {
      maxWait: 10000, // Maximum time to wait for a transaction to start (10 seconds)
      timeout: 15000, // Maximum time a transaction can run (15 seconds)
    },
  });

// Prevent multiple connections in development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
