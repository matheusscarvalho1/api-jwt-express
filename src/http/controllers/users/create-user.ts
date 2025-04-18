import { Request, Response } from "express";
import { z } from "zod";
import { createUserRepository } from "../../../lib/user-service";

const createUser = async (req: Request, res: Response) => {
  const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number().int().positive(),
    email: z.string().email({ message: "E-mail inválido" }),
    password: z
      .string()
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
  });

  try {
    const body = req.body;
    const { firstName, lastName, age, email, password } = schema.parse(body);

    const userResponse = await createUserRepository(
      firstName,
      lastName,
      age,
      email,
      password
    );

    if (!userResponse) {
      return res.status(400).json({ message: "Erro ao criar usuário." });
    }

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user: userResponse,
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
};

export default createUser;
