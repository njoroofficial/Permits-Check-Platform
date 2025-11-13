import { prisma } from "../lib/db";

async function main() {
  console.log("🌱 Starting database seed...");

  // Create Permit Types
  const permitTypes = await Promise.all([
    prisma.permitType.upsert({
      where: { name: "Business License" },
      update: {},
      create: {
        name: "Business License",
        description:
          "License required to operate a business within Murang'a County",
        fee: 2500.0,
        isActive: true,
      },
    }),
    prisma.permitType.upsert({
      where: { name: "Building Permit" },
      update: {},
      create: {
        name: "Building Permit",
        description: "Permit required for construction and building activities",
        fee: 5000.0,
        isActive: true,
      },
    }),
    prisma.permitType.upsert({
      where: { name: "Food Handler's License" },
      update: {},
      create: {
        name: "Food Handler's License",
        description:
          "License for individuals handling food in commercial establishments",
        fee: 1000.0,
        isActive: true,
      },
    }),
    prisma.permitType.upsert({
      where: { name: "Liquor License" },
      update: {},
      create: {
        name: "Liquor License",
        description: "License to sell alcoholic beverages",
        fee: 10000.0,
        isActive: true,
      },
    }),
    prisma.permitType.upsert({
      where: { name: "Transport License" },
      update: {},
      create: {
        name: "Transport License",
        description: "License for public transport vehicles",
        fee: 3000.0,
        isActive: true,
      },
    }),
    prisma.permitType.upsert({
      where: { name: "Environmental Permit" },
      update: {},
      create: {
        name: "Environmental Permit",
        description:
          "Environmental impact assessment and compliance certification for businesses",
        fee: 7500.0,
        isActive: true,
      },
    }),
  ]);

  console.log("✅ Database seeded successfully!");
  console.log(`📊 Created:`);
  console.log(`   - ${permitTypes.length} permit types`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
