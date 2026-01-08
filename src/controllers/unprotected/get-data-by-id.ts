import { Response, Request } from "express";
import { getUnprotectedDataByIdRepository } from "../../repositories/unprotected-repository";

const getUnprotectedDataById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const data = await getUnprotectedDataByIdRepository(id);
    if (!data) {
      return res.status(404).json({ message: "Nenhum usuário encontrado" });
    }
    return res
      .status(200)
      .json({ message: "Usuários listados com sucesso", data: data });
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({ message: "Erro ao listar usuários" });
  }
};

export default getUnprotectedDataById;
