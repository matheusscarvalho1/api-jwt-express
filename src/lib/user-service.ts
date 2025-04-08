import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserNotFoundError } from "../utils/errors/user-not-found-error";
import { generateToken } from "../helpers/authenticator";

const prisma = new PrismaClient();

export async function createUserRepository(
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

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const tokens = generateToken(user.id);

  return { user, tokens };
}

export async function getUsersRepository() {
  const data = await prisma.user.findMany();

  if (!data || data.length === 0) {
    throw new UserNotFoundError();
  }

  return data;
}

export async function getUserByIdRepository(id: string) {
  const data = await prisma.user.findUnique({
    where: { id },
  });

  if (!data) {
    throw new Error("Usuário não encontrado.");
  }

  return data;
}

export async function updateUserRepository(
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

export async function deleteUserRepository(id: string) {
  const userExists = await prisma.user.findFirst({ where: { id } });

  if (!userExists) {
    throw new UserNotFoundError();
  }

  const data = await prisma.user.delete({ where: { id } });

  return data;
}
