import express from "express";

import { deleteUser } from "../../../lib/usuario-service";

const deletarUsuarios = async (req: express.Request, res: express.Response) => {
  const id = req.params.id;

  const response = await deleteUser(id);

  if (!response) {
    return res.status(400).json({ message: "Usuário não encontrado" });
  }
  res.status(200).json({ message: "Usuário deletado" });
};

export default deletarUsuarios;
