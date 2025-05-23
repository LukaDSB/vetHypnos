import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { Location } from '@angular/common';
import {Animal} from 'src/app/models/animal.model';
import { AnimalService } from 'src/app/services/animal.service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-modal-pacientes',
  templateUrl: './modal-pacientes.component.html',
  styleUrls: ['./modal-pacientes.component.scss'],
  standalone: true,
  imports:[FormsModule, CommonModule, HdkButtonComponent, NgxMaskDirective]
})
export class ModalPacientesComponent implements OnInit{
 isCadastroModalOpen = false;
    nomeAnimal = "";
    DataNascAnimal = 0;
    SexoAnimal = "";
    PesoAnimal = 0;
    TutorAnimal = 0;
    especieAnimal = 0;
    especies: any[] = [];
    @Output() cadastrar = new EventEmitter<Animal>();

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
    };

    this.cadastrar.emit(novoAnimal);
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

  voltar(){
    this.location.back();
  }

  openCadastro() {
    this.isCadastroModalOpen = true;
  }

  closeCadastro() {
    this.isCadastroModalOpen = false;
  }

  loginMock() {
    this.authService.loginMock();
  }
}

