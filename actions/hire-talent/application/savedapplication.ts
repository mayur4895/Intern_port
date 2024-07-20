import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function saveApplication(userId: string, applicationId: string) {
  await prisma.savedApplication.create({
    data: {
      userId: userId,
      applicationId: applicationId,
    },
  });
}
