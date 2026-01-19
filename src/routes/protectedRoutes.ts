import { Router } from "express";
import createUnprotectedData from '../controllers/unprotected/createUnprotectedDataController'
import getUnprotectedDataById from "../controllers/unprotected/getUnprotectedDataByIdController";
import updateUnprotectedData from "../controllers/unprotected/updateUnprotectedDataController";
import getUnprotectedData from "../controllers/unprotected/getUnprotectedDataController";
import deleteUnprotectedData from "../controllers/unprotected/deleteUnprotectedDataController";

import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/api/v1/protected/create", authMiddleware, createUnprotectedData);
router.get("/api/v1/protected/get", authMiddleware, getUnprotectedData);
router.get("/api/v1/protected/get/id/:id", authMiddleware, getUnprotectedDataById);
router.put("/api/v1/protected/update/id/:id", authMiddleware, updateUnprotectedData);
router.delete("/api/v1/protected/delete/id/:id", authMiddleware, deleteUnprotectedData);

export { router as protectedRoutes }