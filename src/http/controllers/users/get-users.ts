import { Request, Response } from "express";
import { getUsersRepository } from "../../../lib/user-service";

const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await getUsersRepository();
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

export default getUsers;
