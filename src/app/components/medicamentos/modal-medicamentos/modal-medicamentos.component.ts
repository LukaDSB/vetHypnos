import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { Location } from '@angular/common';
import { Medicamento } from 'src/app/models/medicamento.model';
import { ModalErroComponent } from '../../hdk/modal-erro/modal-erro.component';

@Component({
  selector: 'app-modal-medicamentos',
  templateUrl: './modal-medicamentos.component.html',
  styleUrls: ['./modal-medicamentos.component.scss'],
  standalone: true,
  imports:[FormsModule, CommonModule, HdkButtonComponent, ModalErroComponent]
})
export class ModalMedicamentosComponent {
  @ViewChild(ModalErroComponent) modalErro!: ModalErroComponent;
  isCadastroModalOpen = false;
  isModalCadastro = true;
  isModalAtualizar = false;
  medicamento: Medicamento | undefined;
  nome?: string;
  concentracao?:number;
  categoriaRemedio = 1;
  fabricante?: string;
  lote = 0;
  validade?: string;
  dose_min?: number;
  dose_max?: number;
  quantidade = 0;
  categoria_medicamento_id?: number;

  @Output() cadastrar = new EventEmitter<Medicamento>();
  @Output() atualizar = new EventEmitter<Medicamento>();

  constructor(private authService: AuthService, private location: Location ) {}

  cadastrarMedicamento() {
    if (!this.nome || !this.concentracao || !this.dose_min || !this.dose_max) {
      this.modalErro.abrir('Por favor, preencha todos os campos obrigatórios (*).');
      return;
    }
    const medicamento: Medicamento = {
      id: this.medicamento?.id ?? 0,
      nome: this.nome || '',
      concentracao: this.concentracao,
      categoria_id: this.categoriaRemedio,
      fabricante: this.fabricante || '',
      lote: this.lote,
      validade: this.validade || '',
      dose_min: this.dose_min || 0,
      dose_max: this.dose_max || 0,
      quantidade: this.quantidade,
      categoria_medicamento_id: this.categoria_medicamento_id || 0,
      categoria_medicamento: null
    };
    console.log(`Medicamentos a serem enviados: ${medicamento}`)
  
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
    this.dose_min = med.dose_min;
    this.dose_max = med.dose_max;
  
    this.isModalAtualizar = true;
  
    this.isModalCadastro = false;
    this.isModalAtualizar = true;
    this.isCadastroModalOpen = true;
  }

  voltar(){
    this.location.back();
  }

  atualizarMedicamento() {
    if (!this.medicamento) return;
  
    if (!this.nome || !this.concentracao || !this.dose_min || !this.dose_max) {
      alert('Por favor, preencha todos os campos obrigatórios (*).');
      return;
    }
  
    const medicamentoAtualizado: Medicamento = {
      ...this.medicamento,
      nome: this.nome || '',
      concentracao: this.concentracao,
      categoria_id: this.categoriaRemedio,
      fabricante: this.fabricante || '',
      lote: this.lote,
      validade: this.validade || '',
      quantidade: this.quantidade,
      dose_min: this.dose_min,
      dose_max: this.dose_max
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


