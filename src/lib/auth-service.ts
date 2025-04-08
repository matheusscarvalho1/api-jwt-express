import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { generateToken } from "../helpers/authenticator";

const prisma = new PrismaClient();

export const authenticateUserRepository = async (
  email: string,
  password: string
) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return "Usuário ou senha incorretos.";
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    return "Usuário ou senha incorretos.";
  }

  const tokens = generateToken(user.id);

  return { user, tokens };
};
