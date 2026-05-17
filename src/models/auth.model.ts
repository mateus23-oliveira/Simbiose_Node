import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../interfaces/auth.interface";

export interface IUserDocument extends IUser, Document {}

const UserSchema: Schema = new Schema({
  nome: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  senha: {
    type: String,
    required: true,
  },

  role: {
        type: String,
        enum: ['admin', 'master'],
        default: 'admin' 
    }
});

export const UserModel = mongoose.model<IUserDocument>(
  "User",
  UserSchema
);