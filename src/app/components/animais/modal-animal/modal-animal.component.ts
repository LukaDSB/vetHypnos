import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { Location } from '@angular/common';
import {Animal} from 'src/app/models/animal.model';
import { AnimalService } from 'src/app/services/animal.service';
import { NgxMaskDirective } from 'ngx-mask';
import { DetalhesAnimalComponent } from '../detalhes-animal/detalhes-animal.component';

@Component({
  selector: 'app-modal-animal',
  templateUrl: './modal-animal.component.html',
  styleUrls: ['./modal-animal.component.scss'],
  standalone: true,
  imports:[FormsModule, CommonModule, HdkButtonComponent, NgxMaskDirective]
})
export class ModalAnimalComponent implements OnInit{
    animal: Animal | undefined;
    isCadastroModalOpen = false;
    isAtualizarModal = false;
    isCadastrarModal = true;
    nomeAnimal = "";
    DataNascAnimal = 0;
    SexoAnimal = "";
    PesoAnimal = 0;
    TutorAnimal = 0;
    especieAnimal = 0;
    especies: any[] = [];
    @Output() cadastrar = new EventEmitter<Animal>();
    @Output() atualizar = new EventEmitter<Animal>();
    @ViewChild('detalhesAnimal') detalhesAnimal!: DetalhesAnimalComponent;


  constructor(private authService: AuthService, private location: Location, private animalService: AnimalService) {}
  
  ngOnInit(): void {
      this.animalService.getAnimais().subscribe((animais: any[]) => {
        this.especies = this.getEspeciesUnicas(animais);
    });
  }

  cadastrarAnimal(){
    const novoAnimal: Animal = {
      id:0,
      nome: this.nomeAnimal,
      data_nascimento: this.DataNascAnimal,
      sexo: this.SexoAnimal,
      peso: this.PesoAnimal,
      obito: 0,
      tutor_id:this.TutorAnimal,
      especie_id: this.especieAnimal,
      especie: this.especies.find(especie => especie.id === this.especieAnimal)?.nome || '',
    };

    if (!this.isAtualizarModal){
      this.cadastrar.emit(novoAnimal);
    }

    this.atualizar.emit(novoAnimal);
    
    this.closeCadastro();
  }

  openAtualizar(anml: Animal){
      this.animal = anml; 
      this.nomeAnimal = anml.nome;
      this.DataNascAnimal = anml.data_nascimento;
      this.SexoAnimal = anml.sexo;
      this.PesoAnimal = anml.peso;
      this.TutorAnimal = anml.tutor_id;
      this.especieAnimal = anml.especie_id;

      this.isCadastroModalOpen = true;
      this.isCadastrarModal = false;
  }

  atualizarAnimal(){
    if (!this.animal) return;

    const animalAtualizado: Animal = {
      ...this.animal,
      nome: this.nomeAnimal || '',
      data_nascimento: this.DataNascAnimal,
      sexo: this.SexoAnimal,
      peso: this.PesoAnimal,
      tutor_id: this.TutorAnimal,
      especie_id: this.especieAnimal,

    };
      console.log('teste');

    this.atualizar.emit(animalAtualizado);
    this.closeCadastro();
  }



  getEspeciesUnicas(animais: any[]): any[] {
    const especiesMap = new Map<number, any>();
    for (const animal of animais) {
      const especie = animal.especie;
      if (especie && !especiesMap.has(especie.id)) {
        especiesMap.set(especie.id, especie);
      }
    }
    return Array.from(especiesMap.values());
  }

  resetCampos(){
      this.nomeAnimal = '';
      this.DataNascAnimal = 0;
      this.SexoAnimal =  '';
      this.PesoAnimal = 0;
      this.TutorAnimal = 0;
      this.especieAnimal = 0;
  }


  voltar(){
    this.location.back();
  }

  openCadastro() {
    this.isCadastroModalOpen = true;
    this.resetCampos();
    this.isCadastrarModal= true;
  }

  closeCadastro() {
    this.isCadastroModalOpen = false;
  }

  loginMock() {
    this.authService.loginMock();
  }
}