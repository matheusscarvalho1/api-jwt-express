import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUnprotectedDataRepository = async (data: string) => {
  const unprotectedData = await prisma.unprotectedData.create({
    data: {
      data,
    },
  });

  return unprotectedData;
};

export const getUnprotectedDataRepository = async () => {
  const unprotectedData = await prisma.unprotectedData.findMany();

  if (!unprotectedData) {
    throw new Error("Nenhum dado encontrado.");
  }

  return unprotectedData;
};

export const getUnprotectedDataByIdRepository = async (id: string) => {
  const unprotectedData = await prisma.unprotectedData.findUnique({
    where: { id },
  });

  if (!unprotectedData) {
    throw new Error("Nenhum dado encontrado.");
  }

  return unprotectedData;
};

export const updateUnprotectedDataRepository = async (
  id: string,
  data: string
) => {
  const unprotectedData = await prisma.unprotectedData.update({
    where: { id },
    data: {
      data,
    },
  });

  if (!unprotectedData) {
    throw new Error("Nenhum dado encontrado.");
  }

  return unprotectedData;
};

export const deleteUnprotectedDataRepository = async (id: string) => {
  const unprotectedData = await prisma.unprotectedData.delete({
    where: { id },
  });

  return unprotectedData;
};
