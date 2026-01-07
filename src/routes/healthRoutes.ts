import { Router } from "express";
import HealthStatus from "../controllers/health/healthController";

const router = Router();

  router.get("/api/v1/ping", HealthStatus)

export { router as healthRoutes };
