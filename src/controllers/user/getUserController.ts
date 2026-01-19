import { Request, Response } from "express";
import { getUserService } from "../../services/user/userService";
import { UserNotFoundError } from "../../utils/errors/user-not-found-error";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUserService();

    return res.status(200).json({ 
      message: "Usuários listados com sucesso", 
      users,
      total: users.length
    });

  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res.status(404).json({ message: error.message }); 
    }
    
    console.error("Erro ao buscar usuário:", error);
    return res.status(500).json({ message: "Erro interno" });
  }
};

export default getUsers;
