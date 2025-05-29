import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { Location } from '@angular/common';
import { Animal } from 'src/app/models/animal.model';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-modal-pacientes',
  templateUrl: './modal-pacientes.component.html',
  styleUrls: ['./modal-pacientes.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, HdkButtonComponent, NgxMaskDirective]
})
export class ModalPacientesComponent implements OnInit {
  isCadastroModalOpen = false;
  nomeAnimal = '';
  DataNascAnimal = 0;
  SexoAnimal = '';
  PesoAnimal = 0;
  TutorAnimal = 0;
  especieAnimal = 1;
  especies: any[] = [];

  @Output() cadastrar = new EventEmitter<Animal>();

  constructor(
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {

  }

  cadastrarAnimal() {
    const novoAnimal: Animal = {
      id: 0,
      nome: this.nomeAnimal,
      data_nascimento: this.DataNascAnimal,
      sexo: this.SexoAnimal,
      peso: this.PesoAnimal,
      obito: 0,
      tutor_id: this.TutorAnimal,
      especie_id: this.especieAnimal,
    };

    this.cadastrar.emit(novoAnimal);
    this.closeCadastro();
  }

  voltar() {
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
