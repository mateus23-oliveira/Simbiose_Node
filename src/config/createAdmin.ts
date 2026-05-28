import * as bcrypt from "bcryptjs";
import { UserModel } from "../models/auth.model";

export async function createAdmin() {
  try {
    const adminExiste = await UserModel.findOne({ email: "admin@simbiose.com" });

    if (adminExiste) {
      console.log("Admin já existe");
      return;
    }

    const senhaCriptografada = await bcrypt.hash("123456", 10);

    await UserModel.create({
      nome: "Administrador",
      email: "admin@simbiose.com",
      senha: senhaCriptografada,
      role: "admin",
    });

    console.log("Admin criado com sucesso");
  } catch (error) {
    console.log("Erro ao criar admin");
    console.log(error);
  }
}