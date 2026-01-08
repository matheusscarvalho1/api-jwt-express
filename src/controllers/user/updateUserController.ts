import { Request, Response } from "express";
import { z } from "zod";
import { updateUserService } from "../../services/user/UserService";
import { UserNotFoundError } from "../../utils/errors/user-not-found-error";


const updateUser = async (req: Request, res: Response) => {

  const schema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    age: z.number().int().positive().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
  }).strict();

  try {
  
    const body = schema.parse(req.body);
    const updatedUser = await updateUserService({
        id: req.params.id,
        body,
      });

     res.status(200).json({
      message: "Usuário atualizado com sucesso",
      updatedUser
    });

  } catch (error) {
    if(error instanceof UserNotFoundError){
      throw new Error("Usuário não existe");
    }

    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
    }
    
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
};

export default updateUser;
