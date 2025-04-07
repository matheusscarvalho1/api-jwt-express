import express, { RequestHandler } from "express";
import listarUsuarios from "./listar-usuarios";
import criarUsuarios from "./criar-usuarios";
import atualizarUsuarios from "./atualizar-usuarios";
import deletarUsuarios from "./deletar-usuarios";
import listarUsuariosPorId from "./listar-usuarios-por-id";

export function userRoutes(app: express.Application) {
  const router = express.Router();

  router.post("/v1/usuarios/adicionar", criarUsuarios as RequestHandler);
  router.get("/v1/usuarios/buscar", listarUsuarios as RequestHandler);
  router.get(
    "/v1/usuarios/buscar/id/:id",
    listarUsuariosPorId as RequestHandler
  );
  router.put(
    "/v1/usuarios/atualizar/id/:id",
    atualizarUsuarios as RequestHandler
  );
  router.delete(
    "/v1/usuarios/deletar/id/:id",
    deletarUsuarios as RequestHandler
  );

  app.use("/api", router);
}
