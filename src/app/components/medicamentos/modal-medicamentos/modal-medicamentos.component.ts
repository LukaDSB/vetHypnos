import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { Location } from '@angular/common';
import { Medicamento } from 'src/app/models/medicamento.model';
import { ModalErroComponent } from '../../hdk/modal-erro/modal-erro.component';
import { CategoriasMedicamento } from 'src/app/models/CategoriaMedicamento';
import { CategoriasMedicamentoService } from 'src/app/services/categoriasMedicamento.service';
import { HdkModalFeedbackComponent } from '../../hdk/hdk-modal-feedback/hdk-modal-feedback.component';

@Component({
  selector: 'app-modal-medicamentos',
  templateUrl: './modal-medicamentos.component.html',
  styleUrls: ['./modal-medicamentos.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, HdkButtonComponent, ModalErroComponent, HdkModalFeedbackComponent]
})
export class ModalMedicamentosComponent implements OnInit { 
  @ViewChild(HdkModalFeedbackComponent) modalFeedback!: HdkModalFeedbackComponent;
  

  
  isCadastroModalOpen = false;
  isModalCadastro = true;
  isModalAtualizar = false;
  medicamento?: Medicamento;

  
  nome?: string;
  concentracao?: number;
  fabricante?: string;
  lote?: number;
  validade?: string;
  dose_min?: number;
  dose_max?: number;
  quantidade?: number;
  categoria_medicamento_id?: number | null; 

  
  isDropdownCategoriaAberto = false;
  buscaCategoria = '';
  todasAsCategorias: CategoriasMedicamento[] = [];
  categoriasFiltradas: CategoriasMedicamento[] = [];

  @Output() cadastrar = new EventEmitter<Medicamento>();
  @Output() atualizar = new EventEmitter<Medicamento>();

  constructor(
    private location: Location,
    
    private categoriasService: CategoriasMedicamentoService
  ) {}

  
  ngOnInit(): void {
    this.categoriasService.getCategoriasMedicamento().subscribe((data) => {
      this.todasAsCategorias = data;
      this.categoriasFiltradas = data;
    });
  }

  
  filtrarCategorias(): void {
    if (!this.buscaCategoria) {
      this.categoriasFiltradas = this.todasAsCategorias;
      this.categoria_medicamento_id = null; 
    } else {
      this.categoriasFiltradas = this.todasAsCategorias.filter(cat =>
        cat.descricao.toLowerCase().includes(this.buscaCategoria.toLowerCase())
      );
    }
  }

  abrirDropdownCategoria(): void {
    this.isDropdownCategoriaAberto = true;
  }

  selecionarCategoria(categoria: CategoriasMedicamento): void {
    this.buscaCategoria = categoria.descricao;
    this.categoria_medicamento_id = categoria.id; 
    this.isDropdownCategoriaAberto = false;
  }

  deselecionarCategoria(): void {
    this.buscaCategoria = '';
    this.categoria_medicamento_id = null;
    this.isDropdownCategoriaAberto = false;
  }

  

  cadastrarMedicamento() {
    if (!this.nome || this.concentracao == null || this.dose_min == null || this.dose_max == null || !this.categoria_medicamento_id) {
      this.modalFeedback.open('erro', 'Campos Obrigatórios', 'Por favor, preencha os campos obrigatórios (*).'); 
      return;
    }
    const medicamento: Medicamento = {
      id: this.medicamento?.id ?? 0,
      nome: this.nome,
      concentracao: this.concentracao,
      fabricante: this.fabricante || '',
      lote: this.lote || 0,
      validade: this.validade || '',
      dose_min: this.dose_min,
      dose_max: this.dose_max,
      quantidade: this.quantidade || 0,
      categoria_medicamento_id: this.categoria_medicamento_id, 
      categoria_id: 0, 
      categoria_medicamento: null
    };
    this.modalFeedback.open('sucesso', 'Cadastro Realizado', 'Medicamento cadastrado com sucesso.');

    this.cadastrar.emit(medicamento);
    this.closeCadastro();
  }

  atualizarMedicamento() {
    if (!this.medicamento) return;
    if (!this.nome || this.concentracao == null || this.dose_min == null || this.dose_max == null || !this.categoria_medicamento_id) {
      this.modalFeedback.open('erro', 'Campos Obrigatórios', 'Por favor, preencha o Nome e Peso do animal.'); 
      return;
    }
    const medicamentoAtualizado: Medicamento = {
      ...this.medicamento,
      nome: this.nome,
      concentracao: this.concentracao,
      fabricante: this.fabricante || '',
      lote: this.lote || 0,
      validade: this.validade || '',
      quantidade: this.quantidade || 0,
      dose_min: this.dose_min,
      dose_max: this.dose_max,
      categoria_medicamento_id: this.categoria_medicamento_id, 
    };

    this.atualizar.emit(medicamentoAtualizado);
    this.closeCadastro();
  }

  openAtualizar(med: Medicamento) {
    this.medicamento = med;
    this.nome = med.nome;
    this.concentracao = med.concentracao;
    this.fabricante = med.fabricante;
    this.lote = med.lote;
    this.validade = med.validade;
    this.quantidade = med.quantidade;
    this.dose_min = med.dose_min;
    this.dose_max = med.dose_max;
    
    
    const categoriaSelecionada = this.todasAsCategorias.find(c => c.id === med.categoria_medicamento_id);
    this.buscaCategoria = categoriaSelecionada ? categoriaSelecionada.descricao : '';
    this.categoria_medicamento_id = med.categoria_medicamento_id;
    
    this.isModalCadastro = false;
    this.isModalAtualizar = true;
    this.isCadastroModalOpen = true;
  }

  openCadastro() {
    this.isModalCadastro = true;
    this.isModalAtualizar = false;
    this.resetCampos();
    this.isCadastroModalOpen = true;
  }
  
  resetCampos() {
    this.nome = '';
    this.concentracao = undefined;
    this.fabricante = '';
    this.lote = undefined;
    this.validade = '';
    this.quantidade = undefined;
    this.dose_min = undefined;
    this.dose_max = undefined;
    
    this.buscaCategoria = '';
    this.categoria_medicamento_id = null;
    this.isDropdownCategoriaAberto = false;
    this.categoriasFiltradas = this.todasAsCategorias;
  }

  closeCadastro() {
    this.isCadastroModalOpen = false;
    this.isDropdownCategoriaAberto = false; 
  }
}
