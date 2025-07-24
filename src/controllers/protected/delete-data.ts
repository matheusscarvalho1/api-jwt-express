import { Request, Response } from "express";
import { deleteProtectedDataRepository } from "../../repositories/protected-repository";

const deleteProtectedData = async (req: Request, res: Response) => {
  const id = req.params.id;

  const response = await deleteProtectedDataRepository(id);

  if (!response) {
    res.status(400).json({ message: "Erro ao deletar dado." });
  }

  res.status(200).json({ message: "Dado deletado com sucesso" });
};

export default deleteProtectedData;
