import { Response } from "express";
import { getUserByIdRepository } from "../../repositories/UserRepository";
import { RequestJWT } from "../../@types/customRequest-jwt";
import { UserNotFoundError } from "../../utils/errors/user-not-found-error";

const getUserProfile = async (req: RequestJWT, res: Response) => {
  try {
    const userId = req.user?.sub;

    if (!userId) {
       return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const user = await getUserByIdRepository(userId);

    return res.status(200).json({ message: "Usuário encontrado com sucesso", user });

  } catch (error) {
    if (error instanceof UserNotFoundError) {
      throw new Error("Usuário não encontrado");
    }
    return res.status(500).json({ message: "Erro ao listar usuário" });
  }
};

export default getUserProfile;
