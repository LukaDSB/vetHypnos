import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Animal } from 'src/app/models/animal.model';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes-animal',
  standalone: true,
  imports: [ HdkButtonComponent, CommonModule ],
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
  dadosRecebidos: Animal | undefined;
  historicoProcedimentos = [
  { id: 1, tipo: 'Cirurgia', data: '2025-07-01', nomeMedico: 'Dra. Ana' },
  { id: 2, tipo: 'Consulta', data: '2025-06-15', nomeMedico: 'Dr. João' },
  { id: 3, tipo: 'Exame', data: '2025-06-01', nomeMedico: 'Dra. Carla' }
];


  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { dadosSelecionados: Animal[] };
    
    if (state && state.dadosSelecionados && state.dadosSelecionados.length > 0) {
        this.dadosRecebidos = state.dadosSelecionados[0]; 
    }
  }

  ngOnInit(): void {
    console.log('Dados recebidos na página de detalhes:', this.dadosRecebidos);
  }

  voltar() {
  }

  novaPrescricao() {
  }

  editarAnimal() {
  }
}
