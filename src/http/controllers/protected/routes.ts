import { Router, Application, RequestHandler } from "express";

import authMiddleware from "../../../middleware/authMiddleware";

import postProtectedData from "./create-data";
import deleteProtectedData from "./delete-data";
import getProtectedDataById from "./get-data-by-id";
import getProtectedData from "./get-datas";
import updateProtectedData from "./update-data";

export function protectedRoutes(app: Application) {
  const router = Router();

  router.post(
    "/v1/protected/create",
    authMiddleware,
    postProtectedData as RequestHandler
  );
  router.get(
    "/v1/protected/get",
    authMiddleware,
    getProtectedData as RequestHandler
  );
  router.get(
    "/v1/protected/get/id/:id",
    authMiddleware,
    getProtectedDataById as RequestHandler
  );
  router.put(
    "v1/protected/update/id/:id",
    authMiddleware,
    updateProtectedData as RequestHandler
  );
  router.delete(
    "/v1/protected/delete/id/:id",
    authMiddleware,
    deleteProtectedData as RequestHandler
  );

  app.use("/api", router);
}
