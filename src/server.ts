import express from "express";
import userRoutes from "./routes/especie.routes";
import { Database } from "./config/database";
import authRoutes from './routes/auth.routes';

import cors from 'cors';

import path from "path";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;



const app = express();

app.use(cors());
app.use(express.json());

Database.connect();


app.use("/users", userRoutes);

app.use(
  "/uploads",
  express.static(path.resolve("uploads"))
);

app.use("/especies", userRoutes);


app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
