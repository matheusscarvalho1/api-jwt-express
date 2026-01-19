import { PrismaClient } from "@prisma/client";
import { UserNotFoundError } from "../utils/errors/user-not-found-error";
import { CreateUserDTO } from "../interfaces/ICreateUserDTO";
import { UpdateUserDTO } from "../interfaces/IUpdateUser";

const prisma = new PrismaClient();

export const createNewUserRepository = async ({ firstName, lastName, age, email, password }: CreateUserDTO ) => {
  return await prisma.user.create({
    data: {
      firstName,
      lastName,
      age,
      email,
      password,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      age: true,
      email: true,
      createdAt: true,
    }
  })
}


export const getUsersRepository = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      age: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    }
  });
}

export const getProfileRepository = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new UserNotFoundError();
  }

  return user;
}

export const getUserByIdRepository = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
  })

}

export const findUserByEmailRepository = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  })

}

export const updateUserRepository = async ({ id, body }: UpdateUserDTO) => {
  return prisma.user.update({
    where: { id },
    data: body,
  });
};

export const deleteUserRepository = async (id: string) => {
  const userExists = await prisma.user.findFirst({ where: { id } });

  if (!userExists) {
    throw new UserNotFoundError();
  }

  const deletedUser = await prisma.user.delete({ where: { id } });

  return deletedUser;
}
