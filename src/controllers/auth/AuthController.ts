import { z } from "zod";
import { Request, Response } from "express";
import { authenticateUserService } from "../../services/auth/AuthService"
import { InvalidCredentialsError } from "../../utils/errors/invalid-credentials-error";

const authUser = async (req: Request, res: Response) => {
  try {
    const schema = z.object({
      email: z.string().email({ message: "E-mail inválido" }),
      password: z
        .string()
        .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
    }).strict();

    const { email, password } = schema.parse(req.body);

    const response = await authenticateUserService({ email, password });

     return res.status(200).json({
      message: "Usuário autenticado com sucesso",
      data: response,
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors,
      });
      
    }

    if (error instanceof InvalidCredentialsError) {
      return res.status(401).json({
        message: "Usuário ou senha incorretos"
      });
    }
    
    console.error(error)
     return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export default authUser;
