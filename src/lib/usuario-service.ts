import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserNotFoundError } from "../utils/errors/user-not-found-error";

const prisma = new PrismaClient();

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  const userExists = await prisma.user.findFirst({
    where: { email },
  });

  if (userExists) {
    throw new Error("Email já cadastrado.");
  }

  const hashedPassword = await hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return newUser;
}

export async function getUsers() {
  const data = await prisma.user.findMany();

  if (!data || data.length === 0) {
    throw new UserNotFoundError();
  }

  return data;
}

export async function getUserById(id: string) {
  const data = await prisma.user.findUnique({
    where: { id },
  });

  if (!data) {
    throw new Error("Usuário não encontrado.");
  }

  return data;
}

export async function updateUser(
  id: string,
  name?: string,
  email?: string,
  password?: string
) {
  const userExists = await prisma.user.findFirst({ where: { id } });

  if (!userExists) {
    throw new UserNotFoundError();
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      password: password ? await hash(password, 10) : userExists.password,
    },
  });

  return updatedUser;
}

export async function deleteUser(id: string) {
  const userExists = await prisma.user.findFirst({ where: { id } });

  if (!userExists) {
    throw new UserNotFoundError();
  }

  const data = await prisma.user.delete({ where: { id } });

  return data;
}
