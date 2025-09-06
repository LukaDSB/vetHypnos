import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { Location } from '@angular/common';
import { Medicamento } from 'src/app/models/medicamento.model';
import { ModalErroComponent } from '../../hdk/modal-erro/modal-erro.component';
// --- 1. IMPORTAR O SERVIÇO E O MODELO DA CATEGORIA ---
import { CategoriasMedicamento } from 'src/app/models/CategoriaMedicamento';
import { CategoriasMedicamentoService } from 'src/app/services/categoriasMedicamento.service';

@Component({
  selector: 'app-modal-medicamentos',
  templateUrl: './modal-medicamentos.component.html',
  styleUrls: ['./modal-medicamentos.component.scss'],
  standalone: true,
  imports:[FormsModule, CommonModule, HdkButtonComponent, ModalErroComponent]
})
export class ModalMedicamentosComponent implements OnInit { // Adicionado OnInit
  @ViewChild(ModalErroComponent) modalErro!: ModalErroComponent;

  // --- Propriedades da Modal ---
  isCadastroModalOpen = false;
  isModalCadastro = true;
  isModalAtualizar = false;
  medicamento?: Medicamento;

  // --- Campos do Formulário ---
  nome?: string;
  concentracao?: number;
  fabricante?: string;
  lote?: number;
  validade?: string;
  dose_min?: number;
  dose_max?: number;
  quantidade?: number;
  categoria_medicamento_id?: number | null; // Alterado para aceitar null

  // --- 2. NOVAS PROPRIEDADES PARA O DROPDOWN DE CATEGORIA ---
  isDropdownCategoriaAberto = false;
  buscaCategoria = '';
  todasAsCategorias: CategoriasMedicamento[] = [];
  categoriasFiltradas: CategoriasMedicamento[] = [];

  @Output() cadastrar = new EventEmitter<Medicamento>();
  @Output() atualizar = new EventEmitter<Medicamento>();

  constructor(
    private location: Location,
    // --- 3. INJETAR O SERVIÇO DE CATEGORIAS ---
    private categoriasService: CategoriasMedicamentoService
  ) {}

  // --- 4. BUSCAR AS CATEGORIAS AO INICIALIZAR ---
  ngOnInit(): void {
    this.categoriasService.getCategoriasMedicamento().subscribe((data) => {
      this.todasAsCategorias = data;
      this.categoriasFiltradas = data;
    });
  }

  // --- 5. MÉTODOS PARA CONTROLAR O DROPDOWN DE CATEGORIA ---
  filtrarCategorias(): void {
    if (!this.buscaCategoria) {
      this.categoriasFiltradas = this.todasAsCategorias;
      this.categoria_medicamento_id = null; // Limpa o ID se o campo estiver vazio
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
    this.categoria_medicamento_id = categoria.id; // Armazena o ID
    this.isDropdownCategoriaAberto = false;
  }

  deselecionarCategoria(): void {
    this.buscaCategoria = '';
    this.categoria_medicamento_id = null;
    this.isDropdownCategoriaAberto = false;
  }

  // --- 6. ATUALIZAÇÕES NOS MÉTODOS EXISTENTES ---

  cadastrarMedicamento() {
    if (!this.nome || this.concentracao == null || this.dose_min == null || this.dose_max == null || !this.categoria_medicamento_id) {
      this.modalErro.abrir('Por favor, preencha todos os campos obrigatórios (*).');
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
      categoria_medicamento_id: this.categoria_medicamento_id, // Usa o ID selecionado
      categoria_id: 0, // Ajuste conforme seu modelo, se necessário
      categoria_medicamento: null
    };

    this.cadastrar.emit(medicamento);
    this.closeCadastro();
  }

  atualizarMedicamento() {
    if (!this.medicamento) return;
    if (!this.nome || this.concentracao == null || this.dose_min == null || this.dose_max == null || !this.categoria_medicamento_id) {
      this.modalErro.abrir('Por favor, preencha todos os campos obrigatórios (*).');
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
      categoria_medicamento_id: this.categoria_medicamento_id, // Usa o ID selecionado
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
    
    // Preenche o campo de busca da categoria com a descrição correta
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
    // Reseta os campos da categoria
    this.buscaCategoria = '';
    this.categoria_medicamento_id = null;
    this.isDropdownCategoriaAberto = false;
    this.categoriasFiltradas = this.todasAsCategorias;
  }

  closeCadastro() {
    this.isCadastroModalOpen = false;
    this.isDropdownCategoriaAberto = false; // Garante que o dropdown feche
  }
}
