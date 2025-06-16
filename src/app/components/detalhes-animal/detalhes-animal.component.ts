import { Component } from '@angular/core';

@Component({
  selector: 'app-detalhes-animal',
  standalone: true,
  imports: [],
  templateUrl: './detalhes-animal.component.html',
  styleUrls: ['./detalhes-animal.component.scss'],
})
export class DetalhesAnimalComponent {
  animal = {
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

  editarAnimal() {
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
