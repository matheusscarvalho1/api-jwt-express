import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUnprotectedDataRepository = async (data: string) => {
  return await prisma.unprotectedData.create({
    data: {
      data,
    },
  });
};

export const getUnprotectedDataRepository = async () => {
  return await prisma.unprotectedData.findMany();
};

export const getUnprotectedDataByIdRepository = async (id: string) => {
  return await prisma.unprotectedData.findUnique({
    where: { id },
  });
};

export const updateUnprotectedDataRepository = async (
  id: string,
  data: string
) => {

  return await prisma.unprotectedData.update({
    where: { id },
    data: { data },
  });
};

export const deleteUnprotectedDataRepository = async (id: string) => {
  return await prisma.unprotectedData.delete({
    where: { id },
  });
};
