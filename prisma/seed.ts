import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const defaultEmail = "rachel@remix.run";
  const chefEmail = "crystal@cookbook.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email: defaultEmail } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  await prisma.user.delete({ where: { email: chefEmail } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const defaultHashedPassword = await bcrypt.hash("racheliscool", 10);

  await prisma.user.create({
    data: {
      email: defaultEmail,
      password: {
        create: {
          hash: defaultHashedPassword,
        },
      },
    },
  });

  const chefHashedPassword = await bcrypt.hash("thechefkiss", 10);

  await prisma.user.create({
    data: {
      email: chefEmail,
      password: {
        create: {
          hash: chefHashedPassword,
        },
      },
      isOwner: true,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
