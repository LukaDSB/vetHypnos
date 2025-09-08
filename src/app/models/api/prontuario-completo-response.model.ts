export interface AnimalApiResponse {
  id: number;
  nome: string;
  data_nascimento: string | null;
  peso: string;
  sexo: string | null;
  especie: string;
}

export interface ProcedimentoApiResponse {
  medico_nome: string;
  tipo: string;
  duracao: string;
}

export interface MedicamentoApiResponse {
  medicamento_id: number;
  nome: string;
  concentracao: string;
  volume_min: string;
  volume_max: string;
  categoria_descricao: string;
}

export interface MedicaoClinicaApiResponse {
  parametro_id: number;
  parametro_nome: string;
  horario: string;
  valor: string;
}

export interface ProntuarioCompletoApiResponse {
  id: number;
  data_prontuario: string;
  observacoes: string | null;
  animal: AnimalApiResponse;
  procedimento: ProcedimentoApiResponse;
  medicamentos: MedicamentoApiResponse[];
  medicoes_clinicas: MedicaoClinicaApiResponse[];
}