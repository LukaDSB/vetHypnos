import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HdkButtonComponent } from "../../../hdk/button/hdk-button.component";
import { ModalPacientesComponent } from 'src/app/components/pacientes/modal-pacientes/modal-pacientes.component';
import { ModalAssociarAnimalExistenteComponent } from '../../modal-associar-animal-existente/modal-associar-animal-existente.component';

@Component({
  selector: 'associar-paciente-modal',
  templateUrl: './associar-paciente-modal.component.html',
  styleUrls: ['./associar-paciente-modal.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, HdkButtonComponent, ModalPacientesComponent, ModalAssociarAnimalExistenteComponent]
})

export class AssociarPacienteModalComponent {
  modalAssociar = true;
  modalNovoPaciente = false
  modalSelecionarPaciete = false;
  email = '';
  senha = '';
  nome = '';
  @ViewChild('modalPacientes') modalPacientesComponent!: ModalPacientesComponent;
  @ViewChild ('modalAssociarAnimalExistente') modalAssociarAnimalExistenteComponent! : ModalAssociarAnimalExistenteComponent

  constructor(private authService: AuthService) {}

  isModalNovoPaciente(){
    this.modalNovoPaciente = true;
    this.modalAssociar = false;
  }

  isModalSelecionarPaciente(){
    this.modalSelecionarPaciete = true;
    this.modalAssociar = false;
  }

  abrirModalCadastro() {
  this.modalPacientesComponent.openCadastro();
}

abrirModalAssociarPacienteExistente() {
  this.modalAssociarAnimalExistenteComponent.openModal();
}

}
