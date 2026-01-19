import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserNotFoundError } from "../utils/errors/user-not-found-error";
import { CreateUserDTO } from "../interfaces/ICreateUserDTO";
import { UpdateUserBody, UpdateUserDTO } from "../interfaces/IUpdateUser";

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
    select: {
      id: true,
      firstName: true,
      lastName: true,
      age: true,
      email: true,
      createdAt: true,
      updatedAt: true
    }
  })

}

export const findUserByEmailRepository = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  })

}

export const updateUserRepository = async ({ id, body }: UpdateUserDTO) => {
  const dataToUpdate: UpdateUserBody = {};

  if (body.firstName) dataToUpdate.firstName = body.firstName;
  if (body.lastName) dataToUpdate.lastName = body.lastName;
  if (body.age) dataToUpdate.age = body.age;
  if (body.email) dataToUpdate.email = body.email;
  if (body.password) dataToUpdate.password = await hash(body.password, 10);

  return await prisma.user.update({
    where: { id },
    data: dataToUpdate,
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
