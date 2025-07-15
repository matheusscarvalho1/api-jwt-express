import { RequestHandler } from "express";
import { z } from "zod";
import { createUserRepository } from "../../../lib/user-service";
import { EmailAlreadyExistsError } from "../../../utils/errors/email-already-exists-error";

const createUser: RequestHandler = async (req, res) => {
  const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number().int().positive(),
    email: z.string().email({ message: "E-mail inválido" }),
    password: z.string().min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
  });

  try {
    const { firstName, lastName, age, email, password } = schema.parse(req.body);

    const user = await createUserRepository(firstName, lastName, age, email, password);

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user,
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);

    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Dados inválidos", issues: error.errors });
    }

    if (error instanceof EmailAlreadyExistsError) {
      res.status(409).json({ message: error.message });
    }

    res.status(500).json({ message: "Erro interno ao criar usuário" });
  }
};

export default createUser;
