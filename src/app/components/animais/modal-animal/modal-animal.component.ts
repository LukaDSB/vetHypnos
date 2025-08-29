/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { Animal } from 'src/app/models/animal.model';
import { NgxMaskDirective } from 'ngx-mask';
import { EspecieService } from 'src/app/services/especie.service';
import { Especie } from 'src/app/models/especie.model';

@Component({
  selector: 'app-modal-animal',
  templateUrl: './modal-animal.component.html',
  styleUrls: ['./modal-animal.component.scss'],
  standalone: true,
  imports:[FormsModule, CommonModule, HdkButtonComponent, NgxMaskDirective]
})
export class ModalAnimalComponent implements OnInit{
    isCadastroModalOpen = false;
    isAtualizarModal = false;

    animalId = 0;
    nomeAnimal = "";
    DataNascAnimal = '';
    SexoAnimal = "";
    PesoAnimal: number = 0;
    TutorAnimal = 0;
    especieAnimal: number | null = null;
    
    especies: Especie[] = [];
    
    @Output() cadastrar = new EventEmitter<Animal>();
    @Output() atualizar = new EventEmitter<Animal>();

  constructor(private especieService: EspecieService) {}
  
  ngOnInit(): void {
      this.especieService.getEspecie().subscribe((data: Especie[]) => {
        console.log(data);
        this.especies = data;
    });
  }

  onEspecieChange(novoValor: any) {
  console.log('Novo valor selecionado para espécie:', novoValor);
}

  salvarAnimal() {
    // 1. Limpa a string da data, removendo tudo que não for número.
    const dataLimpa = this.DataNascAnimal.replace(/\D/g, '');

    // 2. Validação: Verifica se a data tem 8 dígitos (DDMMAAAA).
    if (dataLimpa.length !== 8) {
      alert('Por favor, insira uma data de nascimento válida no formato DD/MM/AAAA.');
      return; // Impede o envio do formulário se a data for inválida.
    }

    // 3. Remonta a data no formato YYYY-MM-DD, que é seguro para o banco.
    const dia = dataLimpa.substring(0, 2);
    const mes = dataLimpa.substring(2, 4);
    const ano = dataLimpa.substring(4, 8);
    const dataFormatadaApi = `${ano}-${mes}-${dia}`;

    const animalData: any = { // Use 'any' temporariamente se Animal model estiver tipado
      id: this.animalId,
      nome: this.nomeAnimal,
      data_nascimento: dataFormatadaApi, // <-- Usando a data formatada e segura
      sexo: this.SexoAnimal,
      peso: this.PesoAnimal,
      obito: 0,
      tutor_id: this.TutorAnimal,
      especie_id: this.especieAnimal!,
    };
    console.log('Enviando para a API:', animalData);

    if (this.isAtualizarModal){
      this.atualizar.emit(animalData);
    } else {
      this.cadastrar.emit(animalData);
    }
    
    this.closeCadastro();
}

  openAtualizar(animal: Animal) {
        this.isAtualizarModal = true;

        this.animalId = animal.id;
        this.nomeAnimal = animal.nome;
        
        // Converte 'yyyy-MM-dd' (vindo da API) para 'dd/MM/yyyy' (para o formulário)
        const dataParts = animal.data_nascimento.split('-');
        this.DataNascAnimal = `${dataParts[2]}/${dataParts[1]}/${dataParts[0]}`;

        this.SexoAnimal = animal.sexo;
        this.PesoAnimal = animal.peso;
        this.TutorAnimal = animal.tutor_id;
        this.especieAnimal = animal.especie_id;

        this.isCadastroModalOpen = true;
    }

  openCadastro() {
    this.isAtualizarModal = false;
    this.resetCampos();
    this.isCadastroModalOpen = true;
  }

  resetCampos(){
      this.animalId = 0;
      this.nomeAnimal = '';
      this.DataNascAnimal = '';
      this.SexoAnimal =  '';
      this.PesoAnimal = 0;
      this.TutorAnimal = 0;
      this.especieAnimal = null;
  }

  closeCadastro() {
    this.isCadastroModalOpen = false;
  }
}