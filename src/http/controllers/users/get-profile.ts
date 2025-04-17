import { Response } from "express";
import { getUserByIdRepository } from "../../../lib/user-service";
import { RequestJWT } from "../../../@types/customRequest-jwt";

const getProfile = async (req: RequestJWT, res: Response) => {
  try {
    const userId = req.user?.sub;
    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }
    const data = await getUserByIdRepository(userId);
    if (!data) {
      return res.status(404).json({ message: "Nenhum usuário encontrado" });
    }
    res
      .status(200)
      .json({ message: "Usuário encontrado com sucesso", data: data });
  } catch (error) {
    console.error("Erro ao listar usuário:", error);
    res.status(500).json({ message: "Erro ao listar usuário" });
  }
};

export default getProfile;
