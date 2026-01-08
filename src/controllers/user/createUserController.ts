import { RequestHandler } from "express";
import { z } from "zod";
import { EmailAlreadyExistsError } from "../../utils/errors/email-already-exists-error";
import { createUserService } from "../../services/user/UserService";

const createUser: RequestHandler = async (req, res) => {
  const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number().int().positive(),
    email: z.string().email({ message: "E-mail inválido" }),
    password: z.string().min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
  }).strict();

  try {
    const { firstName, lastName, age, email, password } = schema.parse(req.body);

    await createUserService({ firstName, lastName, age, email, password });

    return res.status(201).json({
      message: "Usuário criado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);

    if (error instanceof z.ZodError) {
     return res.status(400).json({ message: "Dados inválidos", issues: error.errors });
    }

    if (error instanceof EmailAlreadyExistsError) {
      return res.status(409).json({ message: error.message });
    }

     if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
    }

    return res.status(500).json({ message: "Erro interno ao criar usuário" });
  }
};

export default createUser;
