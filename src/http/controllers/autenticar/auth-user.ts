import { z } from "zod";
import { Request, Response } from "express";
import { authenticateUser } from "../../../lib/auth-service";

const authUser = async (req: Request, res: Response) => {
  const schema = z.object({
    email: z.string().email({ message: "E-mail inválido" }),
    password: z
      .string()
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
  });

  const body = req.body;
  const { email, password } = schema.parse(body);

  const response = await authenticateUser(email, password);

  if (!response) {
    res.status(400).json({ message: "Usuário ou senha incorretos." });
  }

  res.status(200).json({
    message: "Usuário autenticado com sucesso",
    data: response,
  });
};

export default authUser;
