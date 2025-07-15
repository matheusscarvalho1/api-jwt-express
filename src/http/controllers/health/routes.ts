import { Application, Router } from "express";
import HealthStatus from './health'


export function healthRoutes(app: Application) {
  const router = Router();

  router.get("/health", HealthStatus)

  app.use("/api", router);
}
