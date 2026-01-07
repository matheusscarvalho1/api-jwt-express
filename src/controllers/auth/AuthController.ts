import { z } from "zod";
import { Request, Response } from "express";
import { authenticateUserService } from "../../services/auth/AuthService"

const authUser = async (req: Request, res: Response) => {
  try {
    const schema = z.object({
      email: z.string().email({ message: "E-mail inválido" }),
      password: z
        .string()
        .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
    })

    const { email, password } = schema.parse(req.body)

    const response = await authenticateUserService({ email, password });

    if (!response) {
      return res.status(401).json({ message: "Usuário ou senha incorretos." });
    }

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
    console.log(error)
     return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export default authUser;
