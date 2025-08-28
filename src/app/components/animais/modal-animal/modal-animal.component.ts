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
        this.especies = data;
    });
  }

  salvarAnimal(){
    const dataNascimentoInt = this.DataNascAnimal 
        ? parseInt(this.DataNascAnimal.replace(/\//g, ''), 10) 
        : 0;
    const animalData: Animal = {
      id: this.animalId,
      nome: this.nomeAnimal,
      data_nascimento: dataNascimentoInt,
      sexo: this.SexoAnimal,
      peso: this.PesoAnimal,
      obito: 0,
      tutor_id: this.TutorAnimal,
      especie_id: this.especieAnimal!,
    };

    if (this.isAtualizarModal){
      this.atualizar.emit(animalData);
    } else {
      this.cadastrar.emit(animalData);
    }
    
    this.closeCadastro();
  }

  openAtualizar(animal: Animal){
      this.isAtualizarModal = true;
      
      this.animalId = animal.id;
      this.nomeAnimal = animal.nome;
      const dobStr = animal.data_nascimento.toString().padStart(8, '0');
      this.DataNascAnimal = `${dobStr.substring(0, 2)}/${dobStr.substring(2, 4)}/${dobStr.substring(4, 8)}`;
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