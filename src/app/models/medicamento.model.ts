export interface CategoriaMedicamento {
  id: number;
  descricao: string;
}

export interface  Medicamento {
  id: number;
  nome: string;
  concentracao: number;
  fabricante: string;
  lote: number;
  validade: string;
  dose_min: number;
  dose_max: number;
  quantidade: number;
  categoria_id: number;
  categoria_medicamento_id: number;
  categoria_medicamento: CategoriaMedicamento | null;
}