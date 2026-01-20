import { Router } from "express";
import HealthStatus from "../controllers/health/healthController";

const router = Router();
/**
 * @openapi
 * tags:
 *   name: Health
 *   description: Endpoints para verificar a integridade do sistema
 */

/**
 * @openapi
 * /api/v1/ping:
 *   get:
 *     summary: Verifica a saúde da API
 *     description: Retorna o status "pong" e o horário atual do servidor em formato ISO.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API está online e respondendo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "pong"
 *                 time:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-01-19T23:48:00.000Z"
 */
  router.get("/api/v1/ping", HealthStatus)

export { router as healthRoutes };
