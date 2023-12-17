import { PrismaClient } from "@prisma/client";
import { RoleData } from "./RoleSeeder";

const prisma = new PrismaClient();

async function main() {
  for (const role of RoleData) {
    await prisma.role.create({
      data: role,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });