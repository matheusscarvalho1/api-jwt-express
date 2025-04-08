import { Request, Response } from "express";
import { z } from "zod";
import { updateUnprotectedDataRepository } from "../../../lib/unprotected-service";

const updateUnprotectedData = (req: Request, res: Response) => {
  const id = req.params.id;

  const schema = z.object({
    data: z.string(),
  });

  try {
    const body = req.body;
    const { data } = schema.parse(body);

    const response = updateUnprotectedDataRepository(id, data);

    if (!response) {
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

export default updateUnprotectedData;
