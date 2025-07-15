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
    return null;
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    return null;
  }

  const tokens = generateToken(user.id);

  return { tokens };
};
