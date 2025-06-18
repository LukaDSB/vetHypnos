import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HdkButtonComponent } from "../../../hdk/button/hdk-button.component";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-prontuario-parcial-modal-adicionar-medicamentos',
  templateUrl: './prontuario-parcial-modal-adicionar-medicamentos.component.html',
  styleUrls: ['./prontuario-parcial-modal-adicionar-medicamentos.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HdkButtonComponent, MatSlideToggleModule, ReactiveFormsModule]
})
export class ProntuarioParcialModalAdicionarMedicamentosComponent {
 isCadastroModalOpen = false;
   isChecked = true;

closeCadastro() {
    this.isCadastroModalOpen = false;
  }

salvarDosagem(){
}

  openCadastro() {
    this.isCadastroModalOpen = true;
  }

}



