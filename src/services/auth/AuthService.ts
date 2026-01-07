import { compare } from "bcryptjs";
import { generateToken } from "../../helpers/authenticator";
import { findUserByEmailRepository } from "../../repositories/AuthRepository";
import { AuthenticationDTO } from "../../interfaces/IAuthenticationDTO";

export const authenticateUserService = async ({
  email,
  password,
}: AuthenticationDTO) => {
  const user = await findUserByEmailRepository(email);

  if (!user) return null;

  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) return null;

  const token = generateToken(user.id);

  return { token };
};