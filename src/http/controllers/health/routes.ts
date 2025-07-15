import { Application, Router } from "express";
import HealthStatus from './health'


export function healthRoutes(app: Application) {
  const router = Router();

  router.get("/v1/health", HealthStatus)

  app.use("/api", router);
}
