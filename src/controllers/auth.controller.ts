import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {

  private authService = new AuthService();

  async registrar(req: Request, res: Response) {
    try {
      const usuario = await this.authService.registrar(req.body);
      return res.json(usuario);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const resultado = await this.authService.login(email, senha);
      return res.json(resultado);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async listarUsuarios(req: Request, res: Response) {
    try {
      const usuarios = await this.authService.listarUsuarios();
      return res.json(usuarios);
    } catch (error: any) {
      return res.status(500).json({ erro: error.message });
    }
  }

  async editarUsuario(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id || Array.isArray(id)) {
        return res.status(400).json({ erro: "ID inválido" });
      }
      const usuario = await this.authService.editarUsuario(id, req.body);
      return res.json(usuario);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async deletarUsuario(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id || Array.isArray(id)) {
        return res.status(400).json({ erro: "ID inválido" });
      }
      const resultado = await this.authService.deletarUsuario(id);
      return res.json(resultado);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }
}