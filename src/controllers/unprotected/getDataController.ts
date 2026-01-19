import { Request, Response } from "express";
import { getUnprotectedDataService } from "../../services/unprotectedData/unprotectedDataService";
import { DataNotFound } from "../../utils/errors/data-not-found-error";

const getUnprotectedData = async (req: Request, res: Response) => {
  try {
    const data = await getUnprotectedDataService();

    return res.status(200).json({ message: "Usuários listados com sucesso", data: data });

  } catch (error) {

    if (error instanceof DataNotFound) {
      return res.status(404).json({
        message: error.message,
      });
    }

    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({ message: "Erro ao listar usuários" });
  }
};

export default getUnprotectedData;
