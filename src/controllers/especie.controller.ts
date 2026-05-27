import { Request, Response } from "express";
import { EspecieService } from "../services/especie.service";

export class UserController {
  private especieService = new EspecieService();

  async criar(req: Request, res: Response) {

  try {

    const {
      nome,
      tempoVida,
      descricao,
      habitat
      
    } = req.body;

    if (!nome || !tempoVida || !descricao || !habitat) {

      return res.status(400).json({
        erro: "Todos os campos são obrigatórios"
      });

    }

    const arquivo = (req as any).file
      ? (req as any).file.filename
      : null;


    const especie = await this.especieService.criar({

      nome,
      tempoVida,
      descricao,
      habitat,
      arquivo

    });

    return res.status(201).json(especie);

  } catch (error) {

    return res.status(500).json({
      erro: "Erro ao criar espécie"
    });

  }
}
  
  async listar(req: Request, res: Response) {

    const especies = await this.especieService.listar();

    return res.json(especies);
  }

  async buscarPorId(req: Request, res: Response) {

    const especie = await this.especieService.buscarPorId(req.params.id as string);

    return res.json(especie);
  }

  async atualizar(req: Request, res: Response) {

    const especie = await this.especieService.atualizar(
      req.params.id as string,
      req.body
    );

    return res.json(especie);
  }

  async deletar(req: Request, res: Response) {

    await this.especieService.deletar(req.params.id as string);

    return res.json({
      mensagem: "Espécie deletada com sucesso"
    });

  }
}
