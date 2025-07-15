import { Request, Response } from "express";
import { getProtectedDataRepository } from "../../../lib/protected-service";

const getProtectedData = async (req: Request, res: Response) => {
  try {
    const data = await getProtectedDataRepository();
    if (!data) {
       res.status(404).json({ message: "Nenhum usuário encontrado" });
    }
    res
      .status(200)
      .json({ message: "Usuários listados com sucesso", data: data });
      
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({ message: "Erro ao listar usuários" });
  }
};

export default getProtectedData;
