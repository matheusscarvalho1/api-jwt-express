import express, { RequestHandler } from "express";

import authUser from "./auth-user";

export function authRoutes(app: express.Application) {
  const router = express.Router();

  router.post("/v1/authenticate/user", authUser as RequestHandler);

  app.use("/api", router);
}
