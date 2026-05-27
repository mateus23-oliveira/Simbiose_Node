import mongoose, { Schema, Document } from "mongoose";
import { IEspecie } from "../interfaces/especie.interface";

export interface IEspecieDocument extends IEspecie, Document {}

const EspecieSchema: Schema = new Schema({
  nome: { 
    type: String,
     required: true },
 
  
     tempoVida: {
       type: Number, 
       required: true },
  
     descricao: { 
      type: String, 
      required: true },
  
      habitat: { 
        type: String, 
        required: true },

      arquivo: {
        type: String,
        required: false,
        default: null,
},
});


export const EspecieModel = mongoose.model<IEspecieDocument>(
  "Especie",
  EspecieSchema
);