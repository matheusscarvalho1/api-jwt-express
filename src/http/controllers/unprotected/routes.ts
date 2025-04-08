import express, { RequestHandler } from "express";

import postUnprotectedData from "./create-data";
import deleteUnprotectedData from "./delete-data";
import getUnprotectedDataById from "./get-data-by-id";
import getUnprotectedData from "./get-datas";
import updateUnprotectedData from "./update-data";

export function unprotectedRoutes(app: express.Application) {
  const router = express.Router();

  router.post("/v1/unprotected/create", postUnprotectedData as RequestHandler);
  router.get("/v1/unprotected/get", getUnprotectedData as RequestHandler);
  router.get(
    "/v1/unprotected/get/id/:id",
    getUnprotectedDataById as RequestHandler
  );
  router.put(
    "v1/unprotected/update/id/:id",
    updateUnprotectedData as RequestHandler
  );
  router.delete(
    "/v1/unprotected/delete/id/:id",
    deleteUnprotectedData as RequestHandler
  );

  app.use("/api", router);
}
