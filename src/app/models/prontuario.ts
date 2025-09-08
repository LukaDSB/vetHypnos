import { Animal } from "./animal.model";
import { Medicamento } from "./medicamento.model";
import { MedicoesClinicas } from "./MedicoesClinicas.model";
import { TipoProcedimento } from "./tipoProcedimento.model";
import { Usuario } from "./usuario.model";

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
    animal: Animal;
    usuario: Usuario;
    tipo_procedimento: TipoProcedimento;
}