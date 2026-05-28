import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const controller = new AuthController();

router.post("/login", (req, res) =>
  controller.login(req, res)
);

router.post("/registrar", authMiddleware, (req, res) =>
  controller.registrar(req, res)
);

router.get("/usuarios", authMiddleware, (req, res) =>
  controller.listarUsuarios(req, res)
);

router.put("/usuarios/:id", authMiddleware, (req, res) =>
  controller.editarUsuario(req, res)
);

router.delete("/usuarios/:id", authMiddleware, (req, res) =>
  controller.deletarUsuario(req, res)
);

export default router;