import { Response, Request } from "express";
import { DataNotFound } from "../../utils/errors/data-not-found-error";
import { getUnprotectedDataByIdService } from "../../services/unprotectedData/unprotectedDataService";

const getUnprotectedDataById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const data = await getUnprotectedDataByIdService(id);
    
    return res.status(200).json({ message: "Usuários listados com sucesso", data: data });
  } catch (error) {
    if (error instanceof DataNotFound) {
      return res.status(404).json({ message: "Dado não encontrado." });
    }
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({ message: "Erro ao listar usuários" });
  }
};

export default getUnprotectedDataById;
