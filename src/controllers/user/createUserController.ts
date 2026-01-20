import { Request, RequestHandler, Response } from "express";
import { z } from "zod";
import { EmailAlreadyExistsError } from "../../utils/errors/email-already-exists-error";
import { createUserService } from "../../services/user/userService";

const createUser: RequestHandler = async (req: Request, res: Response) => {
  const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number().int().positive(),
    email: z.string().email({ message: "E-mail inválido" }),
    password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
    .regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula" })
    .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
    .regex(/[^A-Za-z0-9]/, { message: "A senha deve conter pelo menos um caractere especial" }),
}).strict();

  try {
    const validatedData = schema.parse(req.body);

    const response = await createUserService(validatedData);

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      data: response,
    });
  } catch (error) {
    
    if (error instanceof z.ZodError) {
     return res.status(400).json({ message: "Dados inválidos", issues: error.errors });
    }

    if (error instanceof EmailAlreadyExistsError) {
      return res.status(409).json({ message: error.message });
    }
    
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ message: "Erro interno ao criar usuário" });
  }
};

export default createUser;
