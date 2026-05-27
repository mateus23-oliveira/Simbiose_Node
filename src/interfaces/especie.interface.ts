export interface IEspecie {
  nome: string;
  tempoVida: number;
  descricao: string;
  habitat: string;
  arquivo?: string | null;
}