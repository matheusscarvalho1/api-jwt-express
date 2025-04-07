import express from "express";
import { getUserById } from "../../../lib/usuario-service";

const listarUsuariosPorId = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.params.id;
  try {
    const data = await getUserById(id);
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

export default listarUsuariosPorId;
