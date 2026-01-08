import { CreateUserDTO } from "../../interfaces/ICreateUserDTO";
import { UpdateUserDTO } from "../../interfaces/IUpdateUser";
import { createNewUserRepository, deleteUserRepository, updateUserRepository } from "../../repositories/UserRepository";
import { EmailAlreadyExistsError } from "../../utils/errors/email-already-exists-error";
import { UserNotFoundError } from "../../utils/errors/user-not-found-error";

export const createUserService = async ({ 
    firstName, 
    lastName, 
    age, 
    email, 
    password 
}: CreateUserDTO ) => {

    try {
        const newUser = await createNewUserRepository({ firstName, lastName, age, email, password }) 
        return newUser;

    } catch (error) {
        if (error instanceof EmailAlreadyExistsError) {
            throw error
        }
        throw new Error("Erro ao criar usuário");
    }
    
}

export const deleteUserService = async (id: string) => {
  const user = await deleteUserRepository(id);

  if (!user) {
    throw new UserNotFoundError();
  }

  return user; 
};

export const updateUserService = async ({ id, body }: UpdateUserDTO) => {

  const updatedUser = await updateUserRepository({ id, body });

  if (!updatedUser) {
    throw new UserNotFoundError();
  }

  return updatedUser;
};