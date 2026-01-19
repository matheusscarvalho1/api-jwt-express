import { Request, Response } from "express";
import { z } from "zod";
import { updateUnprotectedDataService } from "../../services/unprotectedData/unprotectedDataService";
import { DataNotFound } from "../../utils/errors/data-not-found-error";


const updateUnprotectedData = (req: Request, res: Response) => {
  const id = req.params.id;

  const schema = z.object({
    data: z.string(),
  }).strict();

  try {
    const body = req.body;
    const { data } = schema.parse(body);

    const response = updateUnprotectedDataService(id, data);

    return res.status(200).json({
      message: "Usuário atualizado com sucesso",
      data: response
    });
  } catch (error) {
    if(error instanceof DataNotFound){
      return res.status(404).json({
        message: error.message
      })
    }
    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
};

export default updateUnprotectedData;
