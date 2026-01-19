import { Response } from "express";
import { RequestJWT } from "../../@types/customRequest-jwt";
import { UserNotFoundError } from "../../utils/errors/user-not-found-error";
import { getUserByIdService } from "../../services/user/UserService";

const getUserProfile = async (req: RequestJWT, res: Response) => {
  try {
    const userId = req.user?.sub;

    if (!userId) {
       return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const user = await getUserByIdService(userId);

     return res.status(200).json({ 
        message: "Perfil recuperado com sucesso", 
        data: user
    });

  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Erro ao listar usuário" });
  }
};

export default getUserProfile;
