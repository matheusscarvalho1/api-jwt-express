import express, { RequestHandler } from "express";

import postProtectedData from "./create-data";
import deleteProtectedData from "./delete-data";
import getProtectedDataById from "./get-data-by-id";
import getProtectedData from "./get-datas";
import updateProtectedData from "./update-data";

export function protectedRoutes(app: express.Application) {
  const router = express.Router();

  router.post("/v1/protected/create", postProtectedData as RequestHandler);
  router.get("/v1/protected/get", getProtectedData as RequestHandler);
  router.get(
    "/v1/protected/get/id/:id",
    getProtectedDataById as RequestHandler
  );
  router.put(
    "v1/protected/update/id/:id",
    updateProtectedData as RequestHandler
  );
  router.delete(
    "/v1/protected/delete/id/:id",
    deleteProtectedData as RequestHandler
  );

  app.use("/api", router);
}
