import { Router } from "express";
import authUser from "../controllers/auth/AuthController";
import authUserRefreshToken from "../controllers/auth/refreshTokenController";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: Gerenciamento de autenticação, login e renovação de tokens (JWT)
*/

/**
 * @openapi
 * /api/v1/auth/user:
 *   post:
 *     summary: Autentica um usuário e gera tokens
 *     description: Recebe e-mail e senha, valida via Zod e retorna o token de acesso.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "usuario@email.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário autenticado com sucesso"
 *                 data:
 *                   type: object
 *                   description: Contém os tokens gerados (accessToken/refreshToken).
 *       400:
 *         description: Erro de validação nos campos (E-mail inválido ou senha curta).
 *       401:
 *         description: E-mail ou senha incorretos (InvalidCredentialsError).
 *       500:
 *         description: Erro interno no servidor.
 */
router.post("/api/v1/auth/user", authUser);

/**
 * @openapi
 * /api/v1/auth/user/refresh-token:
 *   post:
 *     summary: Renova os tokens de autenticação
 *     description: Recebe um Refresh Token válido para gerar um novo par de tokens (Access e Refresh).
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1Ni..."
 *     responses:
 *       200:
 *         description: Tokens renovados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token renovado com sucesso"
 *                 data:
 *                   type: object
 *                   description: Objeto contendo os novos tokens.
 *       400:
 *         description: Campo refreshToken ausente ou vazio (Zod).
 *       401:
 *         description: Token inválido, expirado ou malformado (InvalidTokenError).
 *       500:
 *         description: Erro de configuração (SecretError) ou erro inesperado no servidor.
 */
router.post("/api/v1/auth/user/refresh-token", authUserRefreshToken);

export { router as authRoutes };
