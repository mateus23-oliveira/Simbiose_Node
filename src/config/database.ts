import mongoose from "mongoose";
import dotenv from "dotenv";
import { createAdmin } from "./createAdmin";

dotenv.config();

export class Database {

  static async connect() {

    try {

      await mongoose.connect(process.env.MONGO_URL as string);

      console.log("MongoDB conectado");

      await createAdmin();

    } catch (error) {

      console.error("Erro ao conectar no MongoDB", error);

    }

  }

}