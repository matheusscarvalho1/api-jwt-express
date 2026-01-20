import { Router } from "express";
import createUnprotectedData from '../controllers/unprotected/createUnprotectedDataController'
import getUnprotectedDataById from "../controllers/unprotected/getUnprotectedDataByIdController";
import updateUnprotectedData from "../controllers/unprotected/updateUnprotectedDataController";
import getUnprotectedData from "../controllers/unprotected/getUnprotectedDataController";
import deleteUnprotectedData from "../controllers/unprotected/deleteUnprotectedDataController";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Unprotected
 *   description: Gerenciamento de dados públicos (sem autenticação)
 */

/**
 * @openapi
 * /api/v1/unprotected/create:
 *   post:
 *     summary: Cria um novo dado público
 *     tags: [Unprotected]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [data]
 *             properties:
 *               data:
 *                 type: string
 *                 example: "Minha informação pública"
 *     responses:
 *       201:
 *         description: Dado criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 data: { type: object }
 *       400:
 *         description: Erro de validação (Zod).
 */
router.post("/api/v1/unprotected/create", createUnprotectedData);

/**
 * @openapi
 * /api/v1/unprotected/get:
 *   get:
 *     summary: Lista todos os dados públicos
 *     tags: [Unprotected]
 *     responses:
 *       200:
 *         description: Dados listados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 data: { type: array, items: { type: object } }
 *       404:
 *         description: Nenhum dado encontrado.
 */
router.get("/api/v1/unprotected/get", getUnprotectedData);

/**
 * @openapi
 * /api/v1/unprotected/get/id/{id}:
 *   get:
 *     summary: Busca um dado público pelo ID
 *     tags: [Unprotected]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do dado
 *     responses:
 *       200:
 *         description: Dado encontrado.
 *       404:
 *         description: Dado não encontrado.
 */
router.get("/api/v1/unprotected/get/id/:id", getUnprotectedDataById);

/**
 * @openapi
 * /api/v1/unprotected/update/id/{id}:
 *   put:
 *     summary: Atualiza um dado público
 *     tags: [Unprotected]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [data]
 *             properties:
 *               data:
 *                 type: string
 *                 example: "Nova informação atualizada"
 *     responses:
 *       200:
 *         description: Dado atualizado com sucesso.
 *       404:
 *         description: Dado não encontrado.
 */
router.put("/api/v1/unprotected/update/id/:id", updateUnprotectedData);

/**
 * @openapi
 * /api/v1/unprotected/delete/id/{id}:
 *   delete:
 *     summary: Deleta um dado público
 *     tags: [Unprotected]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dado deletado com sucesso.
 *       404:
 *         description: Dado não encontrado.
 */
router.delete("/api/v1/unprotected/delete/id/:id", deleteUnprotectedData);

export { router as unprotectedRoutes  }