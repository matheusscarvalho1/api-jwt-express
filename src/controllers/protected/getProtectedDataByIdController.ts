import { Request, Response } from "express";
import { DataNotFound } from "../../utils/errors/data-not-found-error";
import { getProtectedDataByIdService } from "../../services/protectedData/protectedDataService";

const getProtectedDataById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await getProtectedDataByIdService(id);
  
    return res.status(200).json({ message: "Usuários listados com sucesso", data: response });
  } catch (error) {
    if (error instanceof DataNotFound) {
        return res.status(404).json({ message: error.message });
      }
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({ message: "Erro ao listar usuários" });
  }
};

export default getProtectedDataById;
