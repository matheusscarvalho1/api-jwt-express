import express from "express";

import { deleteUserRepository } from "../../../lib/user-service";

const deleteUser = async (req: express.Request, res: express.Response) => {
  const id = req.params.id;

  const response = await deleteUserRepository(id);

  if (!response) {
    return res.status(400).json({ message: "Usuário não encontrado" });
  }
  res.status(200).json({ message: "Usuário deletado" });
};

export default deleteUser;
