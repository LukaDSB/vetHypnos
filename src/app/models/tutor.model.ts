import { Contato, Endereco } from "./usuario.model";

export interface Tutor {
  id: number;
  nome: string;
  cpf: string;
  endereco_id: number;
  contato_id:number;
  endereco: Endereco;
  contatos: Contato[];

}