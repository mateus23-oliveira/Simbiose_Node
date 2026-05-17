import express from "express";
import userRoutes from "./routes/user.routes";
import { Database } from "./config/database";

import cors from 'cors';

import authRoutes from "./routes/auth.routes";  
import path from "path";


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

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});