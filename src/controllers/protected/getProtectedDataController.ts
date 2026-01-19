import { Request, Response } from "express";
import z from "zod";
import { getProtectedDataService } from "../../services/protectedData/protectedDataService";
import { DataNotFound } from "../../utils/errors/data-not-found-error";

const getProtectedData = async (req: Request, res: Response) => {
  try {
    const response = await getProtectedDataService();

    return res.status(200).json({ message: "Usuários listados com sucesso", data: response });
      
  } catch (error) {

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: error.errors,
      });
    }
    if (error instanceof DataNotFound) {
      return res.status(400).json({
        errors: error.message,
      });
    }

    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({ message: "Erro ao listar usuários" });
  }
};

export default getProtectedData;
