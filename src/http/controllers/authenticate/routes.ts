import { Application, Router } from "express";

import authUser from "./auth-user";
import authUserRefreshToken from "./auth-user-refresh-token";

export function authRoutes(app: Application) {
  const router = Router();

  router.post("/v1/authenticate/user", authUser);

  router.post(
    "/v1/authenticate/user/refresh",
    authUserRefreshToken
  );

  app.use("/api", router);
}
