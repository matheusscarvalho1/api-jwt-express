import { Application, Router } from "express";
import getUsers from "./get-users";
import getProfile from "./get-profile";
import createUser from "./create-user";
import updateUser from "./update-user";
import deleteUser from "./detele-user";
import getUserById from "./get-user-by-id";
import authMiddleware from "../../../middleware/authMiddleware";

export function userRoutes(app: Application) {
  const router = Router();

  router.post("/v1/user/create", createUser);
  router.get("/v1/user/get", authMiddleware, getUsers);
  router.get(
    "/v1/user/get/profile",
    authMiddleware,
    getProfile
  );
  router.get(
    "/v1/user/get/id/:id",
    authMiddleware,
    getUserById
  );
  router.put(
    "/v1/user/update/id/:id",
    authMiddleware,
    updateUser
  );
  router.delete(
    "/v1/user/delete/id/:id",
    authMiddleware,
    deleteUser
  );

  app.use("/api", router);
}
