import { z } from "zod";
import { Request, Response } from "express";
import { createUnprotectedDataService } from "../../services/unprotectedData/unprotectedDataService";

const createUnprotectedData = async (req: Request, res: Response) => {
  const schema = z.object({
    data: z.string(),
  }).strict();

  try {
    const { data } = schema.parse(req.body);

    const response = await createUnprotectedDataService(data);

    return res.status(201).json({ message: "Dado criado com sucesso", data: response });

  } catch(error) {

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: error.errors,
      });
    }

    console.error("Erro ao criar dados:", error);
    return res.status(500).json({ message: "Erro interno ao criar dados." });
  }

  
};

export default createUnprotectedData;
