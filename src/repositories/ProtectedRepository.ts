import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProtectedDataRepository = async (data: string, userId: string) => {
  return await prisma.protectedData.create({
    data: {
      data,
      userId,
    }
  });
};

export const getProtectedDataRepository = async () => {
  return await prisma.protectedData.findMany({
    include: {
      user: {
        select: {
          email: true,
        }
      }
    }
  });
};

export const getProtectedDataByIdRepository = async (id: string) => {
  return await prisma.protectedData.findUnique({
    where: { id },
    include:{
      user: {
        select: {
          email: true,
        }
      }
    }
  });
};

export const updateProtectedDataRepository = async (
  id: string,
  data: string
) => {
  return await prisma.protectedData.update({
    where: { id },
    data: {
      data,
    },
  });
};

export const deleteProtectedDataRepository = async (id: string) => {
  return await prisma.protectedData.delete({
    where: { id },
  });
};
