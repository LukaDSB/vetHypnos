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
  isModalCadastro = true;
  isModalAtualizar = false;
  medicamento: Medicamento | undefined;
  nome?: string;
  concentracao = 0;
  categoriaRemedio = 1;
  fabricante?: string;
  lote = 0;
  validade?: string;
  quantidade = 0;
  categoria_medicamento_id: number = 0;

  @Output() cadastrar = new EventEmitter<Medicamento>();
  @Output() atualizar = new EventEmitter<Medicamento>();

  constructor(private authService: AuthService, private location: Location ) {}

  cadastrarMedicamento() {
    const medicamento: Medicamento = {
      id: this.medicamento?.id ?? 0,
      nome: this.nome || '',
      concentracao: this.concentracao,
      categoria_id: this.categoriaRemedio,
      fabricante: this.fabricante || '',
      lote: this.lote,
      validade: this.validade || '',
      quantidade: this.quantidade,
      categoria_medicamento_id: this.categoria_medicamento_id,
      categoria_medicamento: null
    };
  
    if (this.isModalAtualizar) {
      this.atualizar.emit(medicamento);
    } else {
      this.cadastrar.emit(medicamento);
    }
  
    this.closeCadastro();
  }

  openAtualizar(med: Medicamento) {
    this.medicamento = med;
    this.nome = med.nome;
    this.concentracao = med.concentracao;
    this.categoriaRemedio = med.categoria_id;
    this.fabricante = med.fabricante;
    this.lote = med.lote;
    this.validade = med.validade;
    this.quantidade = med.quantidade;
  
    this.isModalCadastro = false;
    this.isModalAtualizar = true;
    this.isCadastroModalOpen = true;
  }

  voltar(){
    this.location.back();
  }

  atualizarMedicamento() {
    if (!this.medicamento) return;
  
    const medicamentoAtualizado: Medicamento = {
      ...this.medicamento,
      nome: this.nome || '',
      concentracao: this.concentracao,
      categoria_id: this.categoriaRemedio,
      fabricante: this.fabricante || '',
      lote: this.lote,
      validade: this.validade || '',
      quantidade: this.quantidade
    };
  
    this.atualizar.emit(medicamentoAtualizado);
    this.closeCadastro();
  }

  openCadastro() {
    this.isModalCadastro = true;
    this.isModalAtualizar = false;
    this.resetCampos();
    this.isCadastroModalOpen = true;
  }
  
  resetCampos() {
    this.nome = '';
    this.concentracao = 0;
    this.categoriaRemedio = 1;
    this.fabricante = '';
    this.lote = 0;
    this.validade = '';
    this.quantidade = 0;
  }

  closeCadastro() {
    this.isCadastroModalOpen = false;
  }

  loginMock() {
    this.authService.loginMock();
  }
}


