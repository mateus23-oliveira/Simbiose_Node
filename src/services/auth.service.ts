import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../models/auth.model";

dotenv.config();

export class AuthService {

  async registrar(data: any) {
    const usuarioExiste = await UserModel.findOne({ email: data.email });
    if (usuarioExiste) throw new Error("Usuário já existe");

    const senhaCriptografada = await bcrypt.hash(data.senha, 10);

    const usuario = await UserModel.create({
      nome: data.nome,
      email: data.email,
      senha: senhaCriptografada,
      role: data.role === "admin" ? "admin" : "user",
    });

    return usuario;
  }

  async login(email: string, senha: string) {
    const usuario = await UserModel.findOne({ email });
    if (!usuario) throw new Error("Usuário não encontrado");

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) throw new Error("Senha inválida");

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return { usuario, token };
  }

  async listarUsuarios() {
    return await UserModel.find({}, { senha: 0 });
  }

  async editarUsuario(id: string, data: any) {
    const update: any = {
      nome: data.nome,
      email: data.email,
      role: data.role === "admin" ? "admin" : "user",
    };

    if (data.senha && data.senha.trim() !== "") {
      update.senha = await bcrypt.hash(data.senha, 10);
    }

    const usuario = await UserModel.findByIdAndUpdate(id, update, { new: true, select: "-senha" });
    if (!usuario) throw new Error("Usuário não encontrado");

    return usuario;
  }

  async deletarUsuario(id: string) {
    const usuario = await UserModel.findByIdAndDelete(id);
    if (!usuario) throw new Error("Usuário não encontrado");
    return { mensagem: "Usuário removido com sucesso" };
  }
}