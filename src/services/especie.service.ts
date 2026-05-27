import { IEspecie } from "../interfaces/especie.interface";
import { EspecieModel } from "../models/especie.model";

export class EspecieService {
  
  async criar(eSpecie: IEspecie) {
    return await EspecieModel.create(eSpecie);
  }

  async listar() {
    return await EspecieModel.find();
  }

  async buscarPorId(id: string) {
    return await EspecieModel.findById(id);
  } 

  async atualizar(id: string, dados: Partial<IEspecie>) {
    return await EspecieModel.findByIdAndUpdate(
      id,
      dados,
      { new: true }
    );
  }

  async deletar(id: string) {
    return await EspecieModel.findByIdAndDelete(id);
  }

}