import { Request, Response } from "express";
import { z } from "zod";
import { updateUserRepository } from "../../../lib/user-service";

const updateUser = (req: Request, res: Response) => {
  const id = req.params.id;

  const schema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    age: z.number().int().positive().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
  });

  try {
    const body = req.body;
    const { firstName, lastName, age, email, password } = schema.parse(body);

    const userResponse = updateUserRepository(
      id,
      firstName,
      lastName,
      age,
      email,
      password
    );

    if (!userResponse) {
      res.status(400).json({ message: "Erro ao atualizar usuário." });
    }

    return res.status(200).json({
      message: "Usuário atualizado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
};

export default updateUser;
