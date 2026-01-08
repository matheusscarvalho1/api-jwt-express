import { Request, Response } from "express";
import { getUsersRepository } from "../../repositories/UserRepository";

const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await getUsersRepository();

    if (data.length === 0) {
      return res.status(404).json({ message: "Nenhum usuário encontrado" });
    }

    return res.status(200).json({ message: "Usuários listados com sucesso", data });
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({ message: "Erro ao listar usuários" });
  }
};

export default getUsers;
