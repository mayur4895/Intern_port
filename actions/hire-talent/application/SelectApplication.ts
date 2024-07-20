import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function selectApplication(applicationId: string) {
  await prisma.application.update({
    where: { id: applicationId },
    data: { selected: true },
  });
}
