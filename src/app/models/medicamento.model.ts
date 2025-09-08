import { CategoriasMedicamento } from "./CategoriaMedicamento";


export interface  Medicamento {
  id: number;
  nome: string;
  concentracao: number;
  fabricante: string;
  lote: number;
  validade: string;
  dose_min?: number;
  dose_max?: number;
  quantidade: number;
  categoria_id: number;
  categoria_medicamento_id: number;
  categoria_medicamento: CategoriasMedicamento | null;
  volume_min?: number;
  volume_max?: number;
}