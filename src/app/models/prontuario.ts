import { Medicamento } from "./medicamento.model";
import { MedicoesClinicas } from "./MedicoesClinicas.model";

export interface Prontuario{
    id: number;
    animal_id: number,
    animal_nome: string;
    usuario_id: number;
    usuario_nome: string;
    data_prontuario: string;
    observacoes: string;
    statusProntuario: number;
    procedimento: number;
    tipo_procedimento_id: number;
    medicamentos: Medicamento[];
    medicoes_clinicas: MedicoesClinicas[];
}