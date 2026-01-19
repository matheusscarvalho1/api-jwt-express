import { Router } from "express";


import authMiddleware from "../middleware/authMiddleware";
import createProtectedData from "../controllers/protected/createProtectedDataController";
import getProtectedData from "../controllers/protected/getProtectedDataController";
import getProtectedDataById from "../controllers/protected/getProtectedDataByIdController";
import updateProtectedData from "../controllers/protected/updateProtectedDataController";
import deleteProtectedData from "../controllers/protected/deleteProtectedDataController";

const router = Router();

router.post("/api/v1/protected/create", authMiddleware, createProtectedData);
router.get("/api/v1/protected/get", authMiddleware, getProtectedData);
router.get("/api/v1/protected/get/id/:id", authMiddleware, getProtectedDataById);
router.put("/api/v1/protected/update/id/:id", authMiddleware, updateProtectedData);
router.delete("/api/v1/protected/delete/id/:id", authMiddleware, deleteProtectedData);

export { router as protectedRoutes }