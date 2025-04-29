import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HdkButtonComponent } from "../../../hdk/button/hdk-button.component";


@Component({
  selector: 'associar-paciente-modal',
  templateUrl: './associar-paciente-modal.component.html',
  styleUrls: ['./associar-paciente-modal.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, HdkButtonComponent]
})

export class AssociarPacienteModalComponent {
  modalAssociar = true;
  modalNovoPaciente = false
  modalSelecionarPaciete = false;
  email = '';
  senha = '';
  nome = '';

  constructor(private authService: AuthService) {}

  isModalNovoPaciente(){
    this.modalNovoPaciente = true;
    this.modalAssociar = false;
  }

  isModalSelecionarPaciente(){
    this.modalSelecionarPaciete = true;
    this.modalAssociar = false;
  }
}
