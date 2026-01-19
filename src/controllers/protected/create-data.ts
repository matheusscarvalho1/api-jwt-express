import { z } from "zod";
import { Request, Response } from "express";
import { createProtectedDataRepository } from "../../repositories/protected-repository";

const postProtectData = async (req: Request, res: Response) => {
  const schema = z.object({
    data: z.string(),
  }).strict();

  const body = req.body;
  const { data } = schema.parse(body);

  const response = createProtectedDataRepository(data);

  if (!response) {
    return res.status(400).json({ message: "Erro ao criar dado." });
  }

  return res.status(201).json({ message: "Dado criado com sucesso", data: response });
};

export default postProtectData;
