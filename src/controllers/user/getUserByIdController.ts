
import { UserNotFoundError } from "../../utils/errors/user-not-found-error";
import { getUserByIdService } from "../../services/user/userService";
import { RequestHandler } from "express";

const getUserById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getUserByIdService(id);

    return res.status(200).json({ message: "Usuário encontrado com sucesso", data: response });
    
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({ 
      message: "Erro interno ao buscar usuários" 
    });
  }
};

export default getUserById;
