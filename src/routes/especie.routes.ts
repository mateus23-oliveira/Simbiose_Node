import { Router } from "express";
import { UserController } from "../controllers/especie.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../config/upload";

const router = Router();
const controller = new UserController();

router.post("/",  authMiddleware, upload.single("arquivo"), (req, res) => controller.criar(req, res));
router.get("/", authMiddleware, (req, res) => controller.listar(req, res));
router.get("/:id", authMiddleware, (req, res) => controller.buscarPorId(req, res));
router.put("/:id", authMiddleware, (req, res) => controller.atualizar(req, res));
router.delete("/:id", authMiddleware, (req, res) => controller.deletar(req, res));

export default router;