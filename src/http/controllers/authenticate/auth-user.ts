import { z } from "zod";
import { Request, Response } from "express";
import { authenticateUserRepository } from "../../../lib/auth-service";

const authUser = async (req: Request, res: Response) => {
  try {
    const schema = z.object({
      email: z.string().email({ message: "E-mail inválido" }),
      password: z
        .string()
        .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
    });

    const body = req.body;
    const { email, password } = schema.parse(body);

    const response = await authenticateUserRepository(email, password);

    if (!response) {
       res.status(401).json({ message: "Usuário ou senha incorretos." });
       return;
    }

     res.status(200).json({
      message: "Usuário autenticado com sucesso",
      data: response,
    });
    return;
  } catch (error) {
    if (error instanceof z.ZodError) {
       res.status(400).json({
        message: "Erro de validação",
        errors: error.errors,
      });
      return;
    }

    console.error("Erro ao autenticar:", error);
     res.status(500).json({ message: "Erro interno do servidor" });
     return;
  }
};

export default authUser;
