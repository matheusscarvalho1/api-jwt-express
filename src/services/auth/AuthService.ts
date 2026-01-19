import { compare } from "bcryptjs";
import { generateToken } from "../../helpers/authenticator";
import { findUserByEmailRepository } from "../../repositories/AuthRepository";
import { AuthenticationDTO } from "../../interfaces/IAuthenticationDTO";
import { InvalidCredentialsError } from "../../utils/errors/invalid-credentials-error";

export const authenticateUserService = async ({
  email,
  password,
}: AuthenticationDTO) => {
  const user = await findUserByEmailRepository(email);

  if (!user) throw new InvalidCredentialsError(); 

  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) throw new InvalidCredentialsError();

  const { accessToken, refreshToken } = generateToken(user.id);

  return { accessToken, refreshToken };
};