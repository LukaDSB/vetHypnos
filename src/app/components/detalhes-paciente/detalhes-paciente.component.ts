import { Component } from '@angular/core';

@Component({
  selector: 'app-detalhes-paciente',
  standalone: true,
  imports: [],
  templateUrl: './detalhes-paciente.component.html',
  styleUrls: ['./detalhes-paciente.component.scss'],
})
export class DetalhesPacienteComponent {
  paciente = {
    id: 5,
    nome: 'Placidusax',
    especie: 'Dragão',
    idade: 100,
    peso: 3000.37,
    sexo: '?',
  };

  voltar() {
  }

  novaPrescricao() {
  }

  editarPaciente() {
  }

  historico = [
    {
      id: 'IdPROCEDIMENTO',
      tipo: 'TipoProcedimento',
      data: 'DATA',
      medico: 'NOMEMÉDICO',
    },
    {
      id: 'IdPROCEDIMENTO',
      tipo: 'TipoProcedimento',
      data: 'DATA',
      medico: 'NOMEMÉDICO',
    },
    {
      id: 'IdPROCEDIMENTO',
      tipo: 'TipoProcedimento',
      data: 'DATA',
      medico: 'NOMEMÉDICO',
    },
  ];
}
