import { Component } from '@angular/core';
import { Animal } from 'src/app/models/animal.model';

@Component({
  selector: 'app-detalhes-animal',
  standalone: true,
  imports: [],
  templateUrl: './detalhes-animal.component.html',
  styleUrls: ['./detalhes-animal.component.scss'],
})
export class DetalhesAnimalComponent {
  isCadastroModalOpen = false;
  isAtualizarModal = false;
  isCadastrarModal = true;
  nomeAnimal = "";
  DataNascAnimal = 0;
  SexoAnimal = "";
  PesoAnimal = 0;
  TutorAnimal = 0;
  especie = 0;
  animal: Animal | undefined;

  voltar() {
  }

  novaPrescricao() {
  }

  editarAnimal() {
  }

  openAtualizar(animal: Animal){
        this.animal = animal; 
        this.nomeAnimal = animal.nome;
        this.DataNascAnimal = animal.data_nascimento;
        this.SexoAnimal = animal.sexo;
        this.PesoAnimal = animal.peso;
        this.TutorAnimal = animal.tutor_id;
  
        this.isCadastroModalOpen = true;
        this.isCadastrarModal = false;
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
