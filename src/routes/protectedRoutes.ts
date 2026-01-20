import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import createProtectedData from "../controllers/protected/createProtectedDataController";
import getProtectedData from "../controllers/protected/getProtectedDataController";
import getProtectedDataById from "../controllers/protected/getProtectedDataByIdController";
import updateProtectedData from "../controllers/protected/updateProtectedDataController";
import deleteProtectedData from "../controllers/protected/deleteProtectedDataController";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Protected
 *   description: Gerenciamento de dados sensíveis (Requer Token JWT)
 */

/**
 * @openapi
 * /api/v1/protected/create:
 *   post:
 *     summary: Cria um novo dado protegido
 *     tags: [Protected]
 *     security:
 *       - bearerAuth: []
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
 *                 example: "Minha informação confidencial"
 *     responses:
 *       201:
 *         description: Dado criado com sucesso.
 *       400:
 *         description: Erro de validação (Zod) ou usuário inexistente.
 *       401:
 *         description: Não autenticado ou token inválido.
 *       500:
 *         description: Erro interno ao criar dados.
 */
router.post("/api/v1/protected/create", authMiddleware, createProtectedData);

/**
 * @openapi
 * /api/v1/protected/get:
 *   get:
 *     summary: Lista todos os dados protegidos
 *     tags: [Protected]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista recuperada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 data: { type: array, items: { type: object } }
 *       400:
 *         description: Erro de validação ou dado não encontrado.
 *       401:
 *         description: Não autorizado.
 */
router.get("/api/v1/protected/get", authMiddleware, getProtectedData);

/**
 * @openapi
 * /api/v1/protected/get/id/{id}:
 *   get:
 *     summary: Busca um dado protegido por ID
 *     tags: [Protected]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dado retornado com sucesso.
 *       404:
 *         description: Dado não encontrado (DataNotFound).
 */
router.get("/api/v1/protected/get/id/:id", authMiddleware, getProtectedDataById);

/**
 * @openapi
 * /api/v1/protected/update/id/{id}:
 *   put:
 *     summary: Atualiza um dado protegido
 *     tags: [Protected]
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       200:
 *         description: Atualizado com sucesso.
 *       404:
 *         description: Dado não encontrado para atualização.
 */
router.put("/api/v1/protected/update/id/:id", authMiddleware, updateProtectedData);

/**
 * @openapi
 * /api/v1/protected/delete/id/{id}:
 *   delete:
 *     summary: Deleta um dado protegido
 *     tags: [Protected]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dado removido com sucesso.
 *       404:
 *         description: Dado não encontrado para exclusão.
 */
router.delete("/api/v1/protected/delete/id/:id", authMiddleware, deleteProtectedData);

export { router as protectedRoutes };
