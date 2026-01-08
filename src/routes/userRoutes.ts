import { Router } from "express";
import createUser from "../controllers/user/createUserController";
import getUsers from "../controllers/user/getUserController";
import getUsersById from "../controllers/user/getUserByIdController";
import getUserProfile from "../controllers/user/getUserProfileController";
import authMiddleware from "../middleware/authMiddleware";
import deleteUser from "../controllers/user/deleteUserController";
import updateUser from "../controllers/user/updateUserController";

const router = Router();
 

router.post("/api/v1/user/create", createUser);
router.get("/api/v1/user/get", getUsers);
router.get("/api/v1/user/get/id/:id", getUsersById);
router.get("/api/v1/user/get/profile", authMiddleware, getUserProfile);
router.delete("/api/v1/user/delete/id/:id", deleteUser)
router.put("/api/v1/user/update/id/:id", updateUser)

export { router as userRoutes };

