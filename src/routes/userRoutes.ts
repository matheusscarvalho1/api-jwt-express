import { Router } from "express";
import createUser from "../controllers/user/createUserController";
import getUsers from "../controllers/user/getUserController";
import getUsersById from "../controllers/user/getUserByIdController";
import getUserProfile from "../controllers/user/getUserProfileController";
import authMiddleware from "../middleware/authMiddleware";
import deleteUser from "../controllers/user/deleteUserController";
import updateUser from "../controllers/user/updateUserController";

const router = Router();
 
/**
 * @openapi
 * tags:
 *   name: User
 *   description: Operações de gerenciamento de usuários
 */

/**
 * @openapi
 * /api/v1/user/create:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Realiza o cadastro de um novo usuário no sistema com validação de e-mail único e senha forte.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - age
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Matheus"
 *               lastName:
 *                 type: string
 *                 example: "Carvalho"
 *               age:
 *                 type: integer
 *                 example: 25
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "matheus@email.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$'
 *                 description: >
 *                   A senha deve conter no mínimo 6 caracteres, incluindo:
 *                   - Pelo menos uma letra maiúscula
 *                   - Pelo menos uma letra minúscula
 *                   - Pelo menos um número
 *                   - Pelo menos um caractere especial
 *                 example: "Matheus@2026"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário criado com sucesso"
 *                 data:
 *                   type: object
 *       400:
 *         description: Erro de validação (ZodError) - Senha não atende aos requisitos de complexidade.
 *       409:
 *         description: E-mail já está em uso (EmailAlreadyExistsError).
 *       500:
 *         description: Erro interno ao processar o cadastro.
 */
router.post("/api/v1/user/create", createUser);

/**
 * @openapi
 * /api/v1/user/get:
 *   get:
 *     summary: Lista todos os usuários cadastrados
 *     description: Retorna um array contendo todos os usuários do sistema e a contagem total.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Usuários listados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuários listados com sucesso"
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Dados do usuário.
 *                 total:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Nenhum usuário encontrado (UserNotFoundError).
 *       500:
 *         description: Erro interno ao buscar a lista de usuários.
 */
router.get("/api/v1/user/get", getUsers);

/**
 * @openapi
 * /api/v1/user/get/id/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     description: Retorna os dados completos de um usuário específico através do seu ID único.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único do usuário
 *         schema:
 *           type: string
 *           example: "65a1b2c3d4e5"
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário encontrado com sucesso"
 *                 data:
 *                   type: object
 *                   description: Objeto contendo os dados do usuário retornado pelo serviço.
 *       404:
 *         description: Usuário não encontrado (UserNotFoundError).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário não encontrado"
 *       500:
 *         description: Erro interno no servidor ao buscar o usuário.
 */
router.get("/api/v1/user/get/id/:id", getUsersById);

/**
 * @openapi
 * /api/v1/user/get/profile:
 *   get:
 *     summary: Recupera o perfil do usuário autenticado
 *     description: Retorna os dados do usuário baseando-se no Token JWT enviado no cabeçalho.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil recuperated com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Perfil recuperado com sucesso"
 *                 data:
 *                   type: object
 *                   description: Objeto contendo os dados do usuário.
 *       401:
 *         description: Usuário não autenticado ou token ausente/inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário não autenticado"
 *       404:
 *         description: Usuário não encontrado no banco de dados.
 *       500:
 *         description: Erro interno ao listar o perfil.
 */
router.get("/api/v1/user/get/profile", authMiddleware, getUserProfile);

/**
 * @openapi
 * /api/v1/user/delete/id/{id}:
 *   delete:
 *     summary: Remove um usuário permanentemente
 *     description: Exclui um usuário do sistema utilizando o ID fornecido na URL.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único do usuário a ser deletado
 *         schema:
 *           type: string
 *           example: "65a1b2c3d4e5f6g7h8i9j0"
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário deletado com sucesso"
 *       404:
 *         description: Usuário não encontrado (UserNotFoundError).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário não encontrado"
 *       500:
 *         description: Erro interno do servidor ao processar a exclusão.
 */
router.delete("/api/v1/user/delete/id/:id", deleteUser);

/**
 * @openapi
 * /api/v1/user/update/id/{id}:
 *   put:
 *     summary: Atualiza dados de um usuário existente
 *     description: >
 *       Permite a atualização parcial dos dados do usuário. 
 *       Todos os campos são opcionais. Se a senha for fornecida, ela deve ser forte.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único do usuário a ser atualizado.
 *         schema:
 *           type: string
 *           example: "65a1b2c3d4e5f6"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Matheus"
 *               lastName:
 *                 type: string
 *                 example: "Carvalho"
 *               age:
 *                 type: integer
 *                 example: 26
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "novoemail@email.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$'
 *                 description: >
 *                   Opcional. Se enviada, deve conter no mínimo 6 caracteres, 
 *                   uma maiúscula, uma minúscula, um número e um caractere especial.
 *                 example: "NovaSenha@2026"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário atualizado com sucesso"
 *                 updatedUser:
 *                   type: object
 *                   description: Objeto com os dados atualizados.
 *       400:
 *         description: Erro de validação (Zod) - Dados mal formatados ou senha fraca.
 *       404:
 *         description: Usuário não encontrado (UserNotFoundError).
 *       500:
 *         description: Erro interno no servidor.
 */
router.put("/api/v1/user/update/id/:id", updateUser);

export { router as userRoutes };

