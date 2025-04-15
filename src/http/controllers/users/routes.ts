import express, { RequestHandler } from "express";
import getUsers from "./get-users";
import getProfile from "./get-profile";
import createUser from "./create-user";
import updateUser from "./update-user";
import deleteUser from "./detele-user";
import getUserById from "./get-user-by-id";
import authMiddleware from "../../../middleware/authMiddleware";

export function userRoutes(app: express.Application) {
  const router = express.Router();

  router.post("/v1/user/create", createUser as RequestHandler);
  router.get("/v1/user/get", authMiddleware, getUsers as RequestHandler);
  router.get(
    "/v1/user/get/profile",
    authMiddleware,
    getProfile as RequestHandler
  );
  router.get(
    "/v1/user/get/id/:id",
    authMiddleware,
    getUserById as RequestHandler
  );
  router.put(
    "/v1/user/update/id/:id",
    authMiddleware,
    updateUser as RequestHandler
  );
  router.delete(
    "/v1/user/delete/id/:id",
    authMiddleware,
    deleteUser as RequestHandler
  );

  app.use("/api", router);
}
