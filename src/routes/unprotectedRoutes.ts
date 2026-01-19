import { Router } from "express";
import createUnprotectedData from '../controllers/unprotected/createDataController'
import getUnprotectedDataById from "../controllers/unprotected/getDataByIdController";
import updateUnprotectedData from "../controllers/unprotected/updateDataController";
import getUnprotectedData from "../controllers/unprotected/getDataController";
import deleteUnprotectedData from "../controllers/unprotected/deleteDataController";

const router = Router();

router.post("/api/v1/unprotected/create", createUnprotectedData);
router.get("/api/v1/unprotected/get", getUnprotectedData);
router.get("/api/v1/unprotected/get/id/:id", getUnprotectedDataById);
router.put("/api/v1/unprotected/update/id/:id", updateUnprotectedData);
router.delete("/api/v1/unprotected/delete/id/:id", deleteUnprotectedData);

export { router as unprotectedRoutes  }