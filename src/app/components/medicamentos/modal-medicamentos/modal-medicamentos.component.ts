import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { Location } from '@angular/common';
import { Medicamento } from 'src/app/models/medicamento.model';

@Component({
  selector: 'app-modal-medicamentos',
  templateUrl: './modal-medicamentos.component.html',
  styleUrls: ['./modal-medicamentos.component.scss'],
  standalone: true,
  imports:[FormsModule, CommonModule, HdkButtonComponent]
})
export class ModalMedicamentosComponent {
  isCadastroModalOpen = false;
  nome?: string;
  concentracao = 0;
  categoriaRemedio = 1;
  fabricante?: string;
  lote = 0;
  validade?: string;
  quantidade = 0;
  @Output() cadastrar = new EventEmitter<Medicamento>();

  constructor(private authService: AuthService, private location: Location ) {}

  cadastrarMedicamento() {
    const novoMedicamento: Medicamento = {
      id: 0,
      nome: this.nome || '',
      concentracao: this.concentracao,
      categoria_id: this.categoriaRemedio,
      fabricante: this.fabricante || '',
      lote: this.lote,
      validade: this.validade || '',
      quantidade: this.quantidade
    };
  
    this.cadastrar.emit(novoMedicamento);
    this.closeCadastro();
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


