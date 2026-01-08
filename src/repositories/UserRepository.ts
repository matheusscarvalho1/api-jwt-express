import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserNotFoundError } from "../utils/errors/user-not-found-error";
import { generateToken } from "../helpers/authenticator";
import { EmailAlreadyExistsError } from "../utils/errors/email-already-exists-error";
import { CreateUserDTO } from "../interfaces/ICreateUserDTO";
import { UpdateUserDTO } from "../interfaces/IUpdateUser";

const prisma = new PrismaClient();

export const createNewUserRepository = async ({ firstName, lastName, age, email, password }: CreateUserDTO ) => {

  const userExists = await prisma.user.findFirst({
    where: { email },
  });

  if (userExists) {
    throw new EmailAlreadyExistsError();
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      age,
      email,
      password: hashedPassword,
    },
  });

  const { accessToken, refreshToken } = generateToken(user.id);

  return { user, accessToken, refreshToken };
}


export async function getUsersRepository() {
  return await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      age: true,
      email: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

export async function getProfileRepository(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new UserNotFoundError();
  }

  return user;
}

export async function getUserByIdRepository(id: string) {
  const user = await prisma.user.findUnique({
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

  if (!user) {
    throw new UserNotFoundError();
  }

  return user;
}

export const updateUserRepository = async ({ id, body }: UpdateUserDTO) => {
  const userExists = await prisma.user.findUnique({ where: { id } });

  if (!userExists) {
    throw new UserNotFoundError();
  }

  const passwordHashed = body.password ? await hash(body.password, 10) : userExists.password;

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      firstName: body.firstName ?? userExists.firstName,
      lastName: body.lastName ?? userExists.lastName,
      age: body.age ?? userExists.age,
      email: body.email ?? userExists.email,
      password: passwordHashed,
    },
  });

  return updatedUser;
};

export async function deleteUserRepository(id: string) {
  const userExists = await prisma.user.findFirst({ where: { id } });

  if (!userExists) {
    throw new UserNotFoundError();
  }

  const deletedUser = await prisma.user.delete({ where: { id } });

  return deletedUser;
}
