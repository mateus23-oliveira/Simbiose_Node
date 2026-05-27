export interface IUser {
  nome: string;
  email: string;
  senha: string;
  role?: 'admin' | 'master';
}