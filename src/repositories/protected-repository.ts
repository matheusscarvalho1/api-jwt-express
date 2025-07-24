import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProtectedDataRepository = async (data: string) => {
  const unprotectedData = await prisma.protectedData.create({
    data: {
      data,
    },
  });

  return unprotectedData;
};

export const getProtectedDataRepository = async () => {
  const unprotectedData = await prisma.protectedData.findMany();

  if (!unprotectedData) {
    throw new Error("Nenhum dado encontrado.");
  }

  return unprotectedData;
};

export const getProtectedDataByIdRepository = async (id: string) => {
  const unprotectedData = await prisma.protectedData.findUnique({
    where: { id },
  });

  if (!unprotectedData) {
    throw new Error("Nenhum dado encontrado.");
  }

  return unprotectedData;
};

export const updateProtectedDataRepository = async (
  id: string,
  data: string
) => {
  const unprotectedData = await prisma.protectedData.update({
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

export const deleteProtectedDataRepository = async (id: string) => {
  const unprotectedData = await prisma.protectedData.delete({
    where: { id },
  });

  return unprotectedData;
};
