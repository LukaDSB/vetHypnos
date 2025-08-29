import { Especie } from "./especie.model";

export interface Animal {
  id: number;
  nome: string;
  data_nascimento: string;
  sexo: string;
  peso: number;
  tutor_id: number;
  obito: number;
  especie_id: number;
  especie?: Especie;
}