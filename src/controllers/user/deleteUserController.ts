import {  RequestHandler  } from "express";
import { deleteUserService } from "../../services/user/userService";
import { UserNotFoundError } from "../../utils/errors/user-not-found-error";


const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUserService(id);
    return res.status(200).json({ 
      message: "Usuário deletado com sucesso" 
    });
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    console.error("Erro ao deletar usuário:", error);
    return res.status(500).json({ 
      message: "Erro interno do servidor" 
    });
  }
};

export default deleteUser;
