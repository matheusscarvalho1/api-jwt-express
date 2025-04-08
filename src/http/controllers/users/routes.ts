import express, { RequestHandler } from "express";
import getUsers from "./get-users";
import createUser from "./create-user";
import updateUser from "./update-user";
import deleteUser from "./detele-user";
import getUserById from "./get-user-by-id";

export function userRoutes(app: express.Application) {
  const router = express.Router();

  router.post("/v1/user/create", createUser as RequestHandler);
  router.get("/v1/user/get", getUsers as RequestHandler);
  router.get("/v1/user/get/id/:id", getUserById as RequestHandler);
  router.put("/v1/user/update/id/:id", updateUser as RequestHandler);
  router.delete("/v1/user/delete/id/:id", deleteUser as RequestHandler);

  app.use("/api", router);
}
