/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { Animal } from 'src/app/models/animal.model';
import { NgxMaskDirective } from 'ngx-mask';
import { EspecieService } from 'src/app/services/especie.service';
import { Especie } from 'src/app/models/especie.model';
import { TutorService } from 'src/app/services/tutor.service';
import { Tutor } from 'src/app/models/tutor.model';

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
    isDropdownTutorAberto = false;

    animalId = 0;
    nomeAnimal = "";
    DataNascAnimal = '';
    SexoAnimal = "";
    PesoAnimal: number = 0;
    TutorAnimal: number | null = null;
    especieAnimal: number | null = null;

    buscaTutor = '';
    todosOsTutores: Tutor[] = [];
    tutoresFiltrados: Tutor[] = [];

    especies: Especie[] = [];

    @Output() cadastrar = new EventEmitter<Animal>();
    @Output() atualizar = new EventEmitter<Animal>();

  constructor(
    private especieService: EspecieService,
    private tutorService: TutorService,
    private elementRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownTutorAberto = false;
    }
  }

  ngOnInit(): void {
    this.especieService.getEspecie().subscribe((data: Especie[]) => {
      this.especies = data;
    });

    this.tutorService.getTutores().subscribe((data: Tutor[]) => {
      this.todosOsTutores = data;
      this.tutoresFiltrados = data;
    });
  }

  filtrarTutores(): void {
    this.isDropdownTutorAberto = true;
    if (!this.buscaTutor) {
      this.tutoresFiltrados = this.todosOsTutores;
      this.TutorAnimal = null;
    } else {
      this.tutoresFiltrados = this.todosOsTutores.filter(tutor =>
        tutor.tutor_nome.toLowerCase().includes(this.buscaTutor.toLowerCase())
      );
    }
  }

  abrirDropdownTutor(): void {
    this.isDropdownTutorAberto = true;
  }

  
  selecionarTutor(tutor: Tutor): void {
    this.buscaTutor = tutor.tutor_nome;
    this.TutorAnimal = tutor.id;
    this.isDropdownTutorAberto = false;
  }

  onEspecieChange(novoValor: any) {
    console.log('Novo valor selecionado para espécie:', novoValor);
  }

  salvarAnimal() {
    const dataLimpa = this.DataNascAnimal.replace(/\D/g, '');

    if (this.DataNascAnimal && dataLimpa.length !== 8) {
      alert('Por favor, insira uma data de nascimento válida no formato DD/MM/AAAA.');
      return;
    }

    const dia = dataLimpa.substring(0, 2);
    const mes = dataLimpa.substring(2, 4);
    const ano = dataLimpa.substring(4, 8);
    const dataFormatadaApi = this.DataNascAnimal ? `${ano}-${mes}-${dia}` : null;

    const animalData: any = {
      id: this.animalId,
      nome: this.nomeAnimal,
      data_nascimento: dataFormatadaApi,
      sexo: this.SexoAnimal,
      peso: this.PesoAnimal,
      obito: 0,
      tutor_id: this.TutorAnimal,
      especie_id: this.especieAnimal,
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

    const tutorSelecionado = this.todosOsTutores.find(t => t.id === animal.tutor_id);
    if (tutorSelecionado) {
      this.buscaTutor = tutorSelecionado.tutor_nome;
    } else {
      this.buscaTutor = '';
    }

    if (animal.data_nascimento) {
      const dataParts = animal.data_nascimento.split('-');
      this.DataNascAnimal = `${dataParts[2]}/${dataParts[1]}/${dataParts[0]}`;
    } else {
      this.DataNascAnimal = '';
    }

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
    this.TutorAnimal = null;
    this.especieAnimal = null;
    this.buscaTutor = '';
    this.isDropdownTutorAberto = false;
    this.tutoresFiltrados = this.todosOsTutores;
  }

  closeCadastro() {
    this.isCadastroModalOpen = false;
  }
}
