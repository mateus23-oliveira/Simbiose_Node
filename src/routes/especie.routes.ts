import { Router } from "express";
import { UserController } from "../controllers/especie.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../config/upload";

const router = Router();
const controller = new UserController();

/**
 * @swagger
 * tags:
 *   - name: Espécies
 *     description: Gerenciamento de espécies
 */

/**
 * @swagger
 * /especies:
 *   post:
 *     summary: Cadastrar espécie
 *     tags: [Espécies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - tempoVida
 *               - descricao
 *               - habitat
 *             properties:
 *               nome:
 *                 type: string
 *               tempoVida:
 *                 type: number
 *               descricao:
 *                 type: string
 *               habitat:
 *                 type: string
 *               arquivo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Espécie criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post(
  "/",
  authMiddleware,
  upload.single("arquivo"),
  (req, res) => controller.criar(req, res)
);

/**
 * @swagger
 * /especies:
 *   get:
 *     summary: Listar espécies
 *     tags: [Espécies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de espécies
 */
router.get("/", authMiddleware, (req, res) =>
  controller.listar(req, res)
);

/**
 * @swagger
 * /especies/{id}:
 *   get:
 *     summary: Buscar espécie por ID
 *     tags: [Espécies]
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
 *         description: Espécie encontrada
 *       404:
 *         description: Espécie não encontrada
 */
router.get("/:id", authMiddleware, (req, res) =>
  controller.buscarPorId(req, res)
);

/**
 * @swagger
 * /especies/{id}:
 *   put:
 *     summary: Atualizar espécie
 *     tags: [Espécies]
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
 *         description: Espécie atualizada
 */
router.put("/:id", authMiddleware, (req, res) =>
  controller.atualizar(req, res)
);

/**
 * @swagger
 * /especies/{id}:
 *   delete:
 *     summary: Excluir espécie
 *     tags: [Espécies]
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
 *         description: Espécie removida
 */
router.delete("/:id", authMiddleware, (req, res) =>
  controller.deletar(req, res)
);

export default router;