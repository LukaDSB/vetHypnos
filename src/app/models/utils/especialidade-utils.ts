import { EspecialidadeEnum } from "../enums/especialidade.enum";

export class EspecialidadeUtils {
  static getNome(especialidadeId: number): string {
    switch (especialidadeId) {
      case EspecialidadeEnum.CIRURGIAO:
        return 'Cirurgião';
      case EspecialidadeEnum.ANESTESISTA:
        return 'Anestesista';
      case EspecialidadeEnum.ENFERMEIRO:
        return 'Enfermeiro';
      case EspecialidadeEnum.INSTRUMENTADOR:
        return 'Instrumentador(a)'
      case EspecialidadeEnum.ASSISTENTE:
        return 'Assistente';
      case EspecialidadeEnum.ESTUDANTE:
        return 'Estudante';
      default:
        return 'Não especificado';
    }
  }
}
