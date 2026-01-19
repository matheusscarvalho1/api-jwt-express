import { Request, Response } from "express";
import { deleteUnprotectedDataService } from "../../services/unprotectedData/unprotectedDataService";
import { DataNotFound } from "../../utils/errors/data-not-found-error";

const deleteUnprotectedData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteUnprotectedDataService(id);

    return res.status(200).json({ message: "Dado deletado com sucesso" });
  } catch (error){ 
    if (error instanceof DataNotFound) {
      return res.status(404).json({ message: "Dado não encontrado." });
    }
    console.error("Erro ao deletar usuário: ", error);
    return res.status(500).json({ message: "Erro ao listar usuários" });
    
  }
};

export default deleteUnprotectedData;
