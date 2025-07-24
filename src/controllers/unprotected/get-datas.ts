import { Request, Response } from "express";
import { getUnprotectedDataRepository } from "../../repositories/unprotected-repository";

const getUnprotectedData = async (req: Request, res: Response) => {
  try {
    const data = await getUnprotectedDataRepository();
    if (!data) {
      return res.status(404).json({ message: "Nenhum usuário encontrado" });
    }
    res
      .status(200)
      .json({ message: "Usuários listados com sucesso", data: data });
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({ message: "Erro ao listar usuários" });
  }
};

export default getUnprotectedData;
