import express, { RequestHandler } from "express";

import authUser from "./auth-user";
import authUserRefreshToken from "./auth-user-refresh-token";

export function authRoutes(app: express.Application) {
  const router = express.Router();

  router.post("/v1/authenticate/user", authUser as RequestHandler);

  router.post(
    "/v1/authenticate/user/refresh",
    authUserRefreshToken as RequestHandler
  );

  app.use("/api", router);
}
