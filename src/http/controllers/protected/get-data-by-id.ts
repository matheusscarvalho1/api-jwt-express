import express from "express";
import { getProtectedDataByIdRepository } from "../../../lib/protected-service";

const getProtectedDataById = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.params.id;
  try {
    const data = await getProtectedDataByIdRepository(id);
    if (!data) {
      return res.status(404).json({ message: "Nenhum usuário encontrado" });
    }
    res
      .status(200)
      .json({ message: "Usuários listados com sucesso", data: data });
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({ message: "Erro ao listar usuários" });
  }
};

export default getProtectedDataById;
