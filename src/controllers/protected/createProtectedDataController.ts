import { z } from "zod";
import { Response } from "express";
import { RequestJWT } from "../../@types/customRequest-jwt";
import { createProtectedDataService } from "../../services/protectedData/protectedDataService";
import { UserNotFoundError } from "../../utils/errors/user-not-found-error";

const createProtectedData = async (req: RequestJWT, res: Response) => {
  const schema = z.object({
    data: z.string(),
  }).strict();

  try {
  const userId = req.user?.sub;

  if (!userId) {
    return res.status(401).json({ message: "Não autenticado" });
  }

  const { data } = schema.parse(req.body);
  
  const response = await createProtectedDataService(data, userId);

  return res.status(201).json({ message: "Dado criado com sucesso", data: response });

  } catch (error) {

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: error.errors,
      });
    }

    if (error instanceof UserNotFoundError) {
      return res.status(400).json({
        errors: error.message,
      });
    }

    console.error("Erro ao criar dados:", error);
    return res.status(500).json({ message: "Erro interno ao criar dados." });
  }
};

export default createProtectedData;
