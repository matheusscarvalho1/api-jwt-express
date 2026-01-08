import { Request, Response } from "express";
import { getUserByIdRepository } from "../../repositories/UserRepository";
import { UserNotFoundError } from "../../utils/errors/user-not-found-error";

const getUsersById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await getUserByIdRepository(id);

    return res.status(200).json({ message: "Usuário encontrado com sucesso", user });
    
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({ message: "Erro ao listar usuários" });
  }
};

export default getUsersById;
