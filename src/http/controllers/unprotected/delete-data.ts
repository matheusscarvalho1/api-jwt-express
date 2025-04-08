import { Request, Response } from "express";
import { deleteUnprotectedDataRepository } from "../../../lib/unprotected-service";

const deleteUnprotectedData = async (req: Request, res: Response) => {
  const id = req.params.id;

  const response = await deleteUnprotectedDataRepository(id);

  if (!response) {
    res.status(400).json({ message: "Erro ao deletar dado." });
  }

  res.status(200).json({ message: "Dado deletado com sucesso" });
};

export default deleteUnprotectedData;
