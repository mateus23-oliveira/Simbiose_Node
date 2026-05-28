export interface IUser {
  nome: string;
  email: string;
  senha: string;
  role?: 'user' | 'admin';
}