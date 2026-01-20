import { Request, Response } from "express";
import { z } from "zod";
import { updateUserService } from "../../services/user/userService";
import { UserNotFoundError } from "../../utils/errors/user-not-found-error";


const updateUser = async (req: Request, res: Response) => {

  const schema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    age: z.number().int().positive().optional(),
    email: z.string().email().optional(),
    password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
    .regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula" })
    .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
    .regex(/[^A-Za-z0-9]/, { message: "A senha deve conter pelo menos um caractere especial" })
    .optional(),
}).strict();

  try {
  
    const body = schema.parse(req.body);
    const { id } = req.params;

    const updatedUser = await updateUserService({
        id,
        body,
      });

     return res.status(200).json({
      message: "Usuário atualizado com sucesso",
      updatedUser
    });

  } catch (error) {
    if(error instanceof UserNotFoundError){
      return res.status(404).json({ message: "Usuário não existe" });
    }

    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
    }

    return res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
};

export default updateUser;
