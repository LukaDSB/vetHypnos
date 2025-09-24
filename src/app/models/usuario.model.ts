export interface Estado {
  id: number;
  nome: string;
}

export interface Cidade {
  id: number;
  nome: string;
  estado: Estado | null;
}

export interface Endereco {
  id: number;
  rua: string;
  numero: string;
  bairro: string;
  cidade: Cidade | null;
}

export interface TipoContato {
  id: number;
  descricao: string;
}

export interface Contato {
  id: number;
  descricao: string;
  tipo_contato: TipoContato | null;
}

export interface Clinica {
  id: number;
  nome: string;
  endereco: Endereco | null;
  contatos: Contato[];
}

export interface Especialidade {
  id: number;
  nome: string;
  descricao: string;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  crmv: string | null;
  cpf: string | null;
  clinica_id: number | null;
  especialidade_id: number | null;
  clinica: Clinica | null;
  especialidade: Especialidade | null;
}