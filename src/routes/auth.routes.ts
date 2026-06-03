import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const controller = new AuthController();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Autenticação e gerenciamento de usuários
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realizar login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Credenciais inválidas
 */
router.post("/login", (req, res) =>
  controller.login(req, res)
);

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     summary: Registrar novo usuário
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Mateus Oliveira
 *               email:
 *                 type: string
 *                 example: mateus@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post("/registrar", authMiddleware, (req, res) =>
  controller.registrar(req, res)
);

/**
 * @swagger
 * /auth/usuarios:
 *   get:
 *     summary: Listar usuários
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       401:
 *         description: Não autorizado
 */
router.get("/usuarios", authMiddleware, (req, res) =>
  controller.listarUsuarios(req, res)
);

/**
 * @swagger
 * /auth/usuarios/{id}:
 *   put:
 *     summary: Atualizar usuário
 *     tags: [Auth]
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
 *         description: Usuário atualizado
 *       401:
 *         description: Não autorizado
 */
router.put("/usuarios/:id", authMiddleware, (req, res) =>
  controller.editarUsuario(req, res)
);

/**
 * @swagger
 * /auth/usuarios/{id}:
 *   delete:
 *     summary: Excluir usuário
 *     tags: [Auth]
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
 *         description: Usuário removido
 *       401:
 *         description: Não autorizado
 */
router.delete("/usuarios/:id", authMiddleware, (req, res) =>
  controller.deletarUsuario(req, res)
);

export default router;