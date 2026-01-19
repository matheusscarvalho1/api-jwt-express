import { hash } from "bcryptjs";
import { CreateUserDTO } from "../../interfaces/ICreateUserDTO";
import { UpdateUserDTO } from "../../interfaces/IUpdateUser";
import { createNewUserRepository, deleteUserRepository, updateUserRepository, findUserByEmailRepository, getUsersRepository, getUserByIdRepository } from "../../repositories/UserRepository";

import { generateToken } from "../../helpers/authenticator";
import { EmailAlreadyExistsError } from "../../utils/errors/email-already-exists-error";
import { UserNotFoundError } from "../../utils/errors/user-not-found-error";

export const createUserService = async ({ 
    firstName, 
    lastName, 
    age, 
    email, 
    password 
}: CreateUserDTO ) => {

  const userExists = await findUserByEmailRepository(email);

  if (userExists) {
    throw new EmailAlreadyExistsError();
  }

  const hashedPassword = await hash(password, 10);

  const newUser = await createNewUserRepository({
    firstName,
    lastName,
    age,
    email,
    password: hashedPassword,
  });

  const { accessToken, refreshToken } = generateToken(newUser.id);

  return { user: newUser, accessToken, refreshToken };
};

export const getUserService = async () => {
  return await getUsersRepository();
}

export const getUserByIdService = async (id: string) => {
  const user = await getUserByIdRepository(id);

  if (!user) {
    throw new UserNotFoundError();
  }

  return user;
}

export const deleteUserService = async (id: string) => {

   const userExists = await getUserByIdRepository(id);

  if (!userExists) {
    throw new UserNotFoundError();
  }

  return await deleteUserRepository(id); 
};

export const updateUserService = async ({ id, body }: UpdateUserDTO) => {

  const userExists = await getUserByIdRepository(id);

  if (!userExists) {
    throw new UserNotFoundError();
  }
    
  const updatedUser = await updateUserRepository({ id, body });

  return updatedUser;
};