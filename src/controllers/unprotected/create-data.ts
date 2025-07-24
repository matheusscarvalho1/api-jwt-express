import { z } from "zod";
import { Request, Response } from "express";
import { createUnprotectedDataRepository } from "../../repositories/unprotected-repository";

const postUnprotectedData = async (req: Request, res: Response) => {
  const schema = z.object({
    data: z.string(),
  });

  const body = req.body;
  const { data } = schema.parse(body);

  const response = createUnprotectedDataRepository(data);

  if (!response) {
    res.status(400).json({ message: "Erro ao criar dado." });
  }

  res.status(201).json({ message: "Dado criado com sucesso", data: response });
};

export default postUnprotectedData;
